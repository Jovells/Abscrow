import { expect } from "chai";
import { ethers } from "hardhat";
import { Abscrow, ECedi, Abscrow__factory, ECedi__factory } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { signERC2612Permit } from 'eth-permit';


describe('Abscrow', function () {
  let owner : SignerWithAddress, buyer: SignerWithAddress, buyer2: SignerWithAddress, nonBuyer: SignerWithAddress, seller: SignerWithAddress;
  let eCedi: ECedi, abscrowContract: Abscrow;
  const totalAmount = ethers.utils.parseUnits('1', 6); // 100 tokens
  const deadline = 1000000000

  before(async () => {
    [owner, buyer, buyer2, nonBuyer, seller] = await ethers.getSigners();

    // Deploy the ECedi contract
    const ECedi : ECedi__factory = await ethers.getContractFactory('ECedi');
    eCedi = await ECedi.deploy();
    await eCedi.deployed();
    eCedi.connect(buyer).mint()
    eCedi.connect(buyer2).mint()

    // Deploy the Abscrow contract
    const Abscrow : Abscrow__factory = await ethers.getContractFactory('Abscrow');
    abscrowContract = await Abscrow.deploy(eCedi.address);
    await abscrowContract.deployed();
  });

  describe('deployment', function(){
      it('should set the right owner and ecedi address', async () => {
        expect(await abscrowContract.owner()).to.equal(owner.address);
        expect(await abscrowContract.ECEDI_ADDRESS()).to.equal(eCedi.address);
      });
    
  })
  describe('purchase', function(){
    it('should allow the buyer to purchase a product', async () => {
      const permit = await eCedi.connect(buyer).approve(abscrowContract.address, totalAmount);
    const purchase = await abscrowContract.connect(buyer).purchaseProduct(totalAmount, seller.address, { gasLimit: 3e7 });
    const purchases = await abscrowContract.getPurchases(1, 1);
    expect(purchases[0].buyer).to.equal(buyer.address);
    expect(purchase).to.emit(abscrowContract, 'Sale');
  });
  it('should revert if transfer failed when buying a product', async () => {
    const purchase = abscrowContract.connect(nonBuyer).purchaseProduct(totalAmount, seller.address, { gasLimit: 3e7 });
    await expect(purchase).to.be.reverted;
  })

  })
  describe('release', function(){
    it('should allow the buyer to release funds', async () => {
      const purchaseId = 1;
      const release = await abscrowContract.connect(buyer).release(purchaseId, { gasLimit: 3e7 });
      const purchase = await abscrowContract.purchases(purchaseId);
      expect(purchase.isReleased).to.equal(true);
      expect(release).to.emit(abscrowContract, 'Release');
    });
  
    it('should not allow a double release', async () => {
     const purchaseId = 1;
      const release = abscrowContract.connect(buyer).release(purchaseId , { gasLimit: 3e7 });
      await expect(release).to.be.revertedWith('Funds are already released');
    });
  
    it ('should not allow a non-buyer to release funds', async () => {
      const purchaseId = 1;
      const release = abscrowContract.connect(nonBuyer).release(purchaseId, { gasLimit: 3e7 });
      await expect(release).to.be.revertedWith('Only the Buyer can perform this operation');
    })

  })
  describe('shipment', function(){
    it('should allow the seller to mark a product as shipped', async () => {
       const purchaseId = 1;
      await abscrowContract.connect(seller).markShipped(purchaseId, { gasLimit: 3e7 });
      const purchase = await abscrowContract.purchases(purchaseId);
      expect(purchase.isShipped).to.equal(true);
    });
  
    it('should not allow a double shipment', async () => {
      const purchaseId = 1;
      const shipment = abscrowContract.connect(seller).markShipped(purchaseId, { gasLimit: 3e7 });
      await expect(shipment).to.be.revertedWith('Already shipped');
    })
  
    it ('should not allow a non-seller to mark a product as shipped', async () => {
      const purchaseId = 1;
      const shipment = abscrowContract.connect(nonBuyer).markShipped(purchaseId, { gasLimit: 3e7 });
      await expect(shipment).to.be.revertedWith('Only the Seller can perform this operation');
    })

  })
  describe('arbitration', function(){
    describe('release for', function(){
        it('should allow the owner to release funds for a purchase', async () => {
          await eCedi.connect(buyer2).approve(abscrowContract.address, totalAmount);
          await abscrowContract.connect(buyer2).purchaseProduct(totalAmount, seller.address, { gasLimit: 3e7 });
          const purchaseId = 2;
          await abscrowContract.releaseFor(purchaseId);
          const purchase = await abscrowContract.purchases(purchaseId);
          expect(purchase.isReleased).to.equal(true);
        });
      
        it('should not allow a non-owner to release funds for a purchase', async () => {
          const purchaseId = 2;
          const release = abscrowContract.connect(buyer).releaseFor(purchaseId, { gasLimit: 3e7 });
          await expect(release).to.be.revertedWith('Only the Owner can perform this operation');
        })
      
        it ('should not allow owner to release funds for a purchase that has already been released', async () => {
          const purchaseId = 2;
          const release = abscrowContract.releaseFor(purchaseId, { gasLimit: 3e7 });
          await expect(release).to.be.revertedWith('Funds are already released');
        })

        describe('Refund', function(){

          it('should allow the owner to refund a purchase', async () => {
            await eCedi.connect(buyer).approve(abscrowContract.address, totalAmount);
            await abscrowContract.connect(buyer).purchaseProduct(totalAmount, seller.address, { gasLimit: 3e7 });
            const purchaseId = 3;
            await abscrowContract.refund(purchaseId);
            const purchase = await abscrowContract.purchases(purchaseId);
            expect(purchase).to.deep.equal([0n, ethers.constants.AddressZero, ethers.constants.AddressZero, 0n, false, false]);
          });
          
          it('should not allow owner to refund a purchase that has already been refunded', async () => {
            const purchaseId = 3;
            const refund = abscrowContract.refund(purchaseId, { gasLimit: 3e7 });
            await expect(refund).to.be.revertedWith('ERC20: transfer to the zero address');
          });
        
          it ('should not allow owner to refund a purchase that has already been released', async () => {
            const purchaseId = 2;
            const refund = abscrowContract.refund(purchaseId, { gasLimit: 3e7 });
            await expect(refund).to.be.revertedWith('Funds are already released');
          })
        
          it('should not allow a non-owner to refund a purchase', async () => {
            const purchaseId = 3;
            const refund = abscrowContract.connect(buyer).refund(purchaseId, { gasLimit: 3e7 });
            await expect(refund).to.be.revertedWith('Only the Owner can perform this operation');
          });
        })
 
    })
    
    describe('Reading Records', function(){

      it('should allow the buyer to get their purchases', async () => {
        const buyerPurchases = await abscrowContract.getBuyerPurchases(buyer.address, 1, 3);
        expect(buyerPurchases[0].buyer).to.equal(buyer.address);
      });
    
      it('should not allow an invalid range when getting buyer purchases', async () => {
        const buyerPurchases = abscrowContract.getBuyerPurchases(buyer.address, 1, 0);
        await expect(buyerPurchases).to.be.revertedWith('Invalid range');
      })
    
      it('should allow the seller to get their purchases', async () => {
       const sellerPurchases = await abscrowContract.getSellerPurchases(seller.address, 1, 3);
        expect(sellerPurchases[0].seller).to.equal(seller.address);
      });
    
      it('should not allow an invalid range when getting seller purchases', async () => {
        const sellerPurchases = abscrowContract.getSellerPurchases(seller.address, 1, 0);
        await expect(sellerPurchases).to.be.revertedWith('Invalid range');
      });
    
      it ('should allow getting purchases', async () => {
        const purchases = await abscrowContract.getPurchases(1, 3);
        expect(purchases[0].buyer).to.equal(buyer.address);
      });
    
      it('should not allow an invalid range when getting purchases', async () => {
        const purchases = abscrowContract.getPurchases(1, 0);
        await expect(purchases).to.be.revertedWith('Invalid range');
      });
    })


  

  })



});
