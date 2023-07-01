export const mintNFT = `
// REPLACE THIS WITH YOUR CONTRACT NAME + ADDRESS
import FlowHead from 0x32aa0fc0bbec8419

// Do not change these
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20

transaction(
  recipient: Address,
  name: String,
  description: String,
  thumbnail: String,
) {
  prepare(signer: AuthAccount) {
    if signer.borrow<&FlowHead.Collection>(from: FlowHead.CollectionStoragePath) != nil {
      return
    }

    // Create a new empty collection
    let collection <- FlowHead.createEmptyCollection()

    // save it to the account
    signer.save(<-collection, to: FlowHead.CollectionStoragePath)

    // create a public capability for the collection
    signer.link<&{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(
      FlowHead.CollectionPublicPath,
      target: FlowHead.CollectionStoragePath
    )
  }


  execute {
    // Borrow the recipient's public NFT collection reference
    let receiver = getAccount(recipient)
      .getCapability(FlowHead.CollectionPublicPath)
      .borrow<&{NonFungibleToken.CollectionPublic}>()
      ?? panic("Could not get receiver reference to the NFT Collection")

    // Mint the NFT and deposit it to the recipient's collection
    FlowHead.mintNFT(
      recipient: receiver,
      name: name,
      description: description,
      thumbnail: thumbnail,
    )
    
    log("Minted an NFT and stored it into the collection")
  } 
}
`;
