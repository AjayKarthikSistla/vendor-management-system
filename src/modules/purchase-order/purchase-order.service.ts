import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from '../../entitites/purchase-order.entity';
import { CreatePurchaseOrderDto } from '../purchase-order/dto/create-purchase-order.dto';
import { UpdatePurchaseOrderDto } from '../purchase-order/dto/update-purchase-order.dto';
import { VendorService } from '../vendor/vendor.service';

@Injectable()
export class PurchaseOrderService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly poRepository: Repository<PurchaseOrder>,
  ) {}

  // Create a new purchase order
  async createPurchaseOrder(createPurchaseOrderDto: CreatePurchaseOrderDto): Promise<PurchaseOrder> {
    const purchaseOrder = this.poRepository.create(createPurchaseOrderDto);
    return this.poRepository.save(purchaseOrder);
  }

  // Find all purchase orders
  async findAll(): Promise<PurchaseOrder[]> {
    return this.poRepository.find();
  }

  // Find one purchase order by ID
  async findOne(poId: number): Promise<PurchaseOrder> {
    const purchaseOrder = await this.poRepository.findOne({
      where: { id: poId },
    });
    if (!purchaseOrder) {
      throw new NotFoundException('Purchase Order not found');
    }
    return purchaseOrder;
  }

  // Update a purchase order
  async updatePurchaseOrder(poId: number, updatePurchaseOrderDto: UpdatePurchaseOrderDto): Promise<PurchaseOrder> {
    const purchaseOrder = await this.poRepository.preload({
      id: poId,
      ...updatePurchaseOrderDto,
    });
    if (!purchaseOrder) {
      throw new NotFoundException('Purchase Order not found');
    }
    return this.poRepository.save(purchaseOrder);
  }

  // Delete a purchase order
  async deletePurchaseOrder(poId: number): Promise<void> {
    const purchaseOrder = await this.poRepository.findOne({
      where: { id: poId },
    });
    if (!purchaseOrder) {
      throw new NotFoundException('Purchase Order not found');
    }
    await this.poRepository.remove(purchaseOrder);
  }

  // Acknowledge a purchase order
  async acknowledge(poId: number): Promise<PurchaseOrder> {
    const purchaseOrder = await this.poRepository.findOne({
      where: { id: poId },
    });
    if (!purchaseOrder) {
      throw new NotFoundException('Purchase Order not found');
    }
    // Convert Date to string if acknowledgmentDate is a string in the entity
    purchaseOrder.acknowledgmentDate = new Date().toISOString();
    return this.poRepository.save(purchaseOrder);
  }
}
