import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
  } from 'typeorm';
import { IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class ProductColor {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @Column()
    @IsNotEmpty()
    @IsString()
    code: string;

    //NEW ATTRIBUTE
    @Column({ type: 'int', default: 0 })
    sortOrder: number;

    @ManyToOne(() => Product, (product) => product.colors, {
      onDelete: 'CASCADE',
    })
    product: Product;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}
