import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from '../../entitites/vendor.entity';
import { PurchaseOrder } from '../../entitites/purchase-order.entity';


@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
    @InjectRepository(PurchaseOrder)
    private poRepository: Repository<PurchaseOrder>,
  ) {}

  // Method to create a new vendor
  async createVendor(data): Promise<Vendor[]> {
    const vendor = this.vendorRepository.create(data);
    return this.vendorRepository.save(vendor);
  }

  // Method to find all vendors
  async findAll(): Promise<Vendor[]> {
    return this.vendorRepository.find({ relations: ['purchaseOrders'] });
  }

  // Method to find a vendor by ID
  async findOne(vendorId: string): Promise<Vendor> {
    const id = Number(vendorId);  // Convert vendorId to number
    const vendor = await this.vendorRepository.findOne({
      where: { id },
      relations: ['purchaseOrders'],
    });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    return vendor;
  }

  // Method to update a vendor
  async updateVendor(vendorId: string, data): Promise<Vendor> {
    const id = Number(vendorId);  // Convert vendorId to number
    const vendor = await this.vendorRepository.preload({
      id,
      ...data,
    });
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    return this.vendorRepository.save(vendor);
  }

  // Method to delete a vendor by ID
  async deleteVendor(vendorId: string): Promise<void> {
    const id: any = Number(vendorId);  // Convert vendorId to number
    const vendor = await this.vendorRepository.findOne(id);
    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }
    await this.vendorRepository.remove(vendor);
  }

  // Method to update metrics for a vendor
  async updateMetrics(vendorId: number): Promise<Vendor> {
    const vendor = await this.vendorRepository.findOne({
      where: { id: vendorId },
      relations: ['purchaseOrders'],
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    const completedPOs = vendor.purchaseOrders.filter((po) => po.status === 'completed');
    const totalPOs = vendor.purchaseOrders.length;

    // On-Time Delivery Rate Calculation
    const onTimePOs = completedPOs.filter((po: any) => po.deliveryDate <= new Date()).length;
    vendor.onTimeDeliveryRate = totalPOs > 0 ? (onTimePOs / completedPOs.length) * 100 : 0;

    // Quality Rating Calculation
    const totalQualityRating = completedPOs.reduce((acc, po) => acc + (po.qualityRating || 0), 0);
    vendor.qualityRatingAvg = completedPOs.length > 0 ? totalQualityRating / completedPOs.length : 0;

    // Fulfillment Rate Calculation
    vendor.fulfillmentRate = totalPOs > 0 ? (completedPOs.length / totalPOs) * 100 : 0;

    return this.vendorRepository.save(vendor);
  }

  // Method to get vendor performance
  async getVendorPerformance(vendorId: string): Promise<Vendor> {
    return this.updateMetrics(Number(vendorId));  // Convert vendorId to number
  }
}
