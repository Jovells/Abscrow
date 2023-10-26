import { expect } from "chai";
import { ethers } from "hardhat";
import { Abscrow, ECedi, Abscrow__factory, ECedi__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { signERC2612Permit } from 'eth-permit';


describe('Abscrow', function () {
  let owner : SignerWithAddress, buyer: SignerWithAddress, seller: SignerWithAddress;
  let eCedi: ECedi, abscrowContract: Abscrow;
  const totalAmount = ethers.utils.parseUnits('100', 18); // 100 tokens
  const deadline = 1000000000

  before(async () => {
    [owner, buyer, seller] = await ethers.getSigners();

    // Deploy the ECedi contract
    const ECedi : ECedi__factory = await ethers.getContractFactory('ECedi');
    eCedi = await ECedi.deploy();
    await eCedi.deployed();

    // Deploy the Abscrow contract
    const Abscrow : Abscrow__factory = await ethers.getContractFactory('Abscrow');
    abscrowContract = await Abscrow.deploy(eCedi.address);
    await abscrowContract.deployed();
  });

  it('should allow the buyer to purchase a product', async () => {
    const permit = await signERC2612Permit(buyer, eCedi.address, buyer.address, abscrowContract.address, totalAmount.toString());
  await abscrowContract.purchaseProduct(totalAmount, buyer.address, totalAmount, permit.deadline, permit.v, permit.r, permit.s, { gasLimit: 3e7 });
  const purchases = await abscrowContract.getPurchases(0, 1);
    expect(purchases[0].buyer).to.equal(buyer.address);
  });

  // it('should allow the buyer to release funds', async () => {
  //   const permit = await signERC2612Permit(buyer, eCedi.address, buyer.address, abscrowContract.address, totalAmount.toString());

  //   await abscrowContract.purchaseProduct(totalAmount, buyer.address, totalAmount, permit.deadline, permit.v, permit.r, permit.s);
  //   const purchaseId = 1;
  //   await abscrowContract.release(purchaseId);
  //   const purchase = await abscrowContract.purchases(purchaseId);
  //   expect(purchase.isReleased).to.equal(true);
  // });

  // it('should allow the seller to mark a product as shipped', async () => {
  //   const permit = await signERC2612Permit(buyer, eCedi.address, buyer.address, abscrowContract.address, totalAmount.toString());

  //   await abscrowContract.purchaseProduct(totalAmount, buyer.address, totalAmount, permit.deadline, permit.v, permit.r, permit.s);
  //   const purchaseId = 1;
  //   await abscrowContract.markShipped(purchaseId);
  //   const purchase = await abscrowContract.purchases(purchaseId);
  //   expect(purchase.isShipped).to.equal(true);
  // });

  // it('should not allow a double release', async () => {
  //   const permit = await signERC2612Permit(buyer, eCedi.address, buyer.address, abscrowContract.address, totalAmount.toString());

  //   await abscrowContract.purchaseProduct(totalAmount, buyer.address, totalAmount, permit.deadline, permit.v, permit.r, permit.s);
  //   const purchaseId = 1;
  //   await abscrowContract.release(purchaseId);
  //   await expect(abscrowContract.release(purchaseId)).to.be.revertedWith('Funds are already released');
  // });

  // it('should allow the owner to release funds for a purchase', async () => {
  //   const permit = await signERC2612Permit(buyer, eCedi.address, buyer.address, abscrowContract.address, totalAmount.toString());

  //   await abscrowContract.purchaseProduct(totalAmount, buyer.address, totalAmount, permit.deadline, permit.v, permit.r, permit.s);
  //   const purchaseId = 1;
  //   await abscrowContract.releaseFor(purchaseId);
  //   const purchase = await abscrowContract.purchases(purchaseId);
  //   expect(purchase.isReleased).to.equal(true);
  // });

  // it('should allow the owner to refund a purchase', async () => {
  //   const permit = await signERC2612Permit(buyer, eCedi.address, buyer.address, abscrowContract.address, totalAmount.toString());

  //   await abscrowContract.purchaseProduct(totalAmount, buyer.address, totalAmount, permit.deadline, permit.v, permit.r, permit.s);
  //   const purchaseId = 1;
  //   await abscrowContract.refund(purchaseId);
  //   const purchase = await abscrowContract.purchases(purchaseId);
  //   expect(purchase.isReleased).to.equal(true);
  // });

  // it('should allow the buyer to get their purchases', async () => {
  //   const permit = await signERC2612Permit(buyer, eCedi.address, buyer.address, abscrowContract.address, totalAmount.toString());

  //   await abscrowContract.purchaseProduct(totalAmount, buyer.address, totalAmount, permit.deadline, permit.v, permit.r, permit.s);
  //   const buyerPurchases = await abscrowContract.getBuyerPurchases(buyer.address, 1, 1);
  //   expect(buyerPurchases[0].buyer).to.equal(buyer.address);
  // });

  // it('should allow the seller to get their purchases', async () => {
  //   const permit = await signERC2612Permit(buyer, eCedi.address, buyer.address, abscrowContract.address, totalAmount.toString());

  //   await abscrowContract.purchaseProduct(totalAmount, buyer.address, totalAmount, permit.deadline, permit.v, permit.r, permit.s);
  //   const sellerPurchases = await abscrowContract.getSellerPurchases(seller.address, 1, 1);
  //   expect(sellerPurchases[0].seller).to.equal(seller.address);
  // });
});
