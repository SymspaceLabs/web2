import { Injectable } from '@nestjs/common';
import { CreatePreferencesDto } from './dto/create-preference.dto';
import { UpdatePreferencesDto } from './dto/update-preference.dto';
import { Preference } from './entities/preference.entity';
import User from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PreferencesService {
  
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
  ) {}

  // Create a new preference
  async create(createPreferencesDto: CreatePreferencesDto, userId: string) {
    const { 
      styles, 
      fits, 
      colors, 
      tops, 
      bottoms, 
      outerwears, 
      accessories, 
      brands, 
      gender 
    } = createPreferencesDto;

    // Check if the user exists
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if preferences already exist for the user
    const existingPreference = await this.preferenceRepository.findOne({
      where: { user: { id: userId } },
    });

    let data;

    if (existingPreference) {
      // Update the existing preferences
      const updatedPreference = await this.preferenceRepository.save({
        ...existingPreference,
        styles,
        fits,
        colors,
        tops,
        bottoms,
        outerwears,
        accessories,
        brands,
        gender,
      });
      data = updatedPreference;
    } else {
      // Create a new preference
      const newPreference = this.preferenceRepository.create({
        styles,
        fits,
        colors,
        tops,
        bottoms,
        outerwears,
        accessories,
        brands,
        gender,
        user,
      });
      data =  await this.preferenceRepository.save(newPreference);
    }

    return {
      preference: data,
      message: 'Preference information updated successfully',
    };
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
    return await this.preferenceRepository.findOne({
      where: { user: { id: userId } },
    });

  }


  findAll() {
    return `This action returns all preferences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} preference`;
  }

  update(id: number, updatePreferencesDto: UpdatePreferencesDto) {
    return `This action updates a #${id} preference`;
  }

  remove(id: number) {
    return `This action removes a #${id} preference`;
  }
}

