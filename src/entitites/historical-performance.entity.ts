import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity()
export class HistoricalPerformance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor)
  vendor: Vendor;

  @Column()
  date: Date;

  @Column({ type: 'float' })
  onTimeDeliveryRate: number;

  @Column({ type: 'float' })
  qualityRatingAvg: number;

  @Column({ type: 'float' })
  averageResponseTime: number;

  @Column({ type: 'float' })
  fulfillmentRate: number;
}
