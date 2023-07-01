export const getTotalSupply =
  // REPLACE THIS WITH YOUR CONTRACT NAME + ADDRESS
  `
import FlowHead from 0x32aa0fc0bbec8419;

pub fun main(): UInt64 {

    return FlowHead.totalSupply;

}
`;
