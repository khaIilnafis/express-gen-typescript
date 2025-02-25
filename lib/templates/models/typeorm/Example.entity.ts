// @ts-nocheck - Template file, not meant to be validated directly
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

/**
 * Example entity
 */
@Entity("examples")
export class Example {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({
    type: "enum",
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  })
  status: "pending" | "in-progress" | "completed";

  @Column({ default: 1 })
  priority: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
