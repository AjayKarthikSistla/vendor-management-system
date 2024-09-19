import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity()
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  poNumber: string;

  @ManyToOne(() => Vendor, (vendor) => vendor.purchaseOrders, { onDelete: 'CASCADE' })
  vendor: Vendor;

  @Column({ type: 'date' })
  orderDate: string;

  @Column({ type: 'date' })
  deliveryDate: string;

  @Column('json')
  items: any;

  @Column()
  quantity: number;

  @Column()
  status: string;

  @Column({ type: 'date' })
  issueDate: string;

  @Column({ type: 'date', nullable: true })
  acknowledgmentDate: string;

  @Column({ type: 'float', nullable: true })
  qualityRating: number;
}
