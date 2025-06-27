import { Injectable } from '@nestjs/common';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Measurement } from 'src/measurements/entities/measurement.entity';
import User from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Preference } from 'src/preferences/entities/preference.entity';

@Injectable()
export class OnboardingService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Measurement)
    private readonly measurementRepository: Repository<Measurement>,
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
  ) {}

  async create(createOnboardingDto: CreateOnboardingDto, userId: string) {
    // Fetch the user by ID
    const user = await this.usersRepository.findOne({ where: { id: userId } });
  
    if (!user) return { message: 'User not found' };
  
    const { measurement, preference, user: userData   } = createOnboardingDto;
  
    // Step 1: Handle Measurement Data
    let existingMeasurement = await this.measurementRepository.findOne({ where: { user: { id: userId } } });
  
    if (existingMeasurement) {
      // Update existing measurement
      existingMeasurement.height = measurement?.height ?? existingMeasurement.height;
      existingMeasurement.weight = measurement?.weight ?? existingMeasurement.weight;
      existingMeasurement.chest = measurement?.chest ?? existingMeasurement.chest;
      existingMeasurement.waist = measurement?.waist ?? existingMeasurement.waist;
      
      
      // Explicitly handle the boolean case for isMetric
      if (measurement?.isMetric !== undefined) {
        existingMeasurement.isMetric = measurement.isMetric;
      }
      existingMeasurement.isMetric = measurement?.isMetric ?? existingMeasurement.isMetric;
      await this.measurementRepository.save(existingMeasurement);

    } else {
      // Create new measurement
      const newMeasurement = this.measurementRepository.create({
        height: measurement?.height || 0,
        weight: measurement?.weight || 0,
        chest: measurement?.chest || 0,
        waist: measurement?.waist || 0,
        isMetric: measurement?.isMetric !== undefined ? measurement.isMetric : true,
        user,
      });
  
      existingMeasurement = await this.measurementRepository.save(newMeasurement);
    }
  
    // Step 2: Handle Preference Data
    let existingPreference = await this.preferenceRepository.findOne({ where: { user: { id: userId } } });
  
    if (existingPreference) {
      // Update existing preference
      existingPreference.tops = preference?.tops ?? existingPreference.tops;
      existingPreference.bottoms = preference?.bottoms ?? existingPreference.bottoms;
      existingPreference.outerwears = preference?.outerwears ?? existingPreference.outerwears;
      existingPreference.accessories = preference?.accessories ?? existingPreference.accessories;
      existingPreference.styles = preference?.styles ?? existingPreference.styles;
      existingPreference.fits = preference?.fits ?? existingPreference.fits;
      existingPreference.brands = preference?.brands ?? existingPreference.brands;
      existingPreference.colors = preference?.colors ?? existingPreference.colors;
      existingPreference.gender = preference?.gender ?? existingPreference.gender;
      await this.preferenceRepository.save(existingPreference);
    } else {
      // Create new preference
      const newPreference = this.preferenceRepository.create({
        tops: preference?.tops || [],
        bottoms: preference?.bottoms || [],
        outerwears: preference?.outerwears || [],
        accessories: preference?.accessories || [],
        styles: preference?.styles || [],
        fits: preference?.fits || [],
        brands: preference?.brands || [],
        colors: preference?.colors || [],
        gender: preference?.gender || 'both',
        user,
      });
  
      existingPreference = await this.preferenceRepository.save(newPreference);
    }
  
    // Step 3: Update User Data
    user.dob = userData?.dob ? new Date(userData.dob) : user.dob;
    user.firstName = userData?.firstName ?? user.firstName;
    user.lastName = userData?.lastName ?? user.lastName;
    user.isOnboardingFormFilled = true;
  
    await this.usersRepository.save(user);
  
    // Step 4: Return Response
    return {
      message: 'Onboarding completed successfully',
      user: {
        id: user.id,
        dob: user.dob,
      },
      isOnboardingFormFilled: user.isOnboardingFormFilled,
      measurement: existingMeasurement,
      preference: existingPreference,
    };
  }
  
  async findOneByUserId(userId: string) {
    // Find user by ID
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
  
    // Find the preferences associated with the user
    const preference = await this.preferenceRepository.findOne({
      where: { user: { id: userId } },
    });
  
    // Return the user, measurement, and preference data
    return {
      user: {
        id: user.id,
        dob: user.dob,
        isOnboardingFormFilled: user.isOnboardingFormFilled,
      },
      measurement: measurement
        ? {
            height: measurement.height,
            weight: measurement.weight,
            isMetric: measurement.isMetric
          }
        : null, // Return null if no measurement is found
      preference: preference
        ? {
            gender: preference.gender,
            tops: preference.tops,
            bottoms: preference.bottoms,
            outerwears: preference.outerwears,
            accessories: preference.accessories,
            styles: preference.styles,
            fits: preference.fits,
            brands: preference.brands,
            colors: preference.colors,
          }
        : null, // Return null if no preference is found
    };
  }
  
}
