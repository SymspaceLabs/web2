//measurements.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeasurementDto } from './dto/create-measurement.dto';
import { UpdateMeasurementDto } from './dto/update-measurement.dto';
import { Measurement } from './entities/measurement.entity';
import User from '../users/entities/user.entity';

@Injectable()
export class MeasurementsService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Measurement)
    private readonly measurementRepository: Repository<Measurement>,
  ) {}

  // Create a new measurement
  async create(createMeasurementDto: CreateMeasurementDto, userId: string) {
    const { weight, height, chest, waist, isMetric } = createMeasurementDto;

    // Check if the user exists
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if a measurement already exists for the user
    const existingMeasurement = await this.measurementRepository.findOne({
      where: { user: { id: userId } },
    });

    let data;

    if (existingMeasurement) {
      // Update the existing measurement
      const updatedMeasurement = await this.measurementRepository.save({
        ...existingMeasurement,
        weight,
        height,
        chest,
        waist,
        isMetric,
      });
      data = updatedMeasurement;
    } else {
      // Create a new measurement
      const newMeasurement = this.measurementRepository.create({
        weight,
        height,
        chest,
        waist,
        isMetric,
        user,
      });
      data =  await this.measurementRepository.save(newMeasurement);
    }

    return {
      measurement: data,
      message: 'Measurement information updated successfully',
    };
  }

  // Get all measurements
  async findAll() {
    return await this.measurementRepository.find();
  }

  // Get a single measurement by id
  async findOneByUserId(userId: string) {
    // Find the user by ID
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error('User not found');
    }

    // Find the measurement associated with the user
    const measurement = await this.measurementRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!measurement) {
      throw new NotFoundException('Measurement not found for the user');
    }

    return measurement;

  }
  
  // Update a measurement by id
  async update(id: string, updateMeasurementDto: UpdateMeasurementDto) {
    const { weight, height, chest, waist, isMetric } = updateMeasurementDto;

    const measurement = await this.measurementRepository.preload({
      id,
      weight,
      height,
      chest,
      waist,
      isMetric,
    });

    if (!measurement) {
      throw new Error('Measurement not found');
    }

    const data = await this.measurementRepository.save(measurement);

    return {
      measurement: data,
      message: 'Measurement information updated successfully',
    };
  }

  // Remove a measurement by id
  async remove(id: string) {
    const measurement = await this.measurementRepository.findOne({ where: { id } });
  
    if (!measurement) {
      throw new Error('Measurement not found');
    }
  
    return await this.measurementRepository.remove(measurement);
  }
  
}
