import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerOnboardingDto } from './dto/create-seller-onboarding.dto';
import { UpdateSellerOnboardingDto } from './dto/update-seller-onboarding.dto';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import { DataSource, Not, Repository } from 'typeorm';
import { Company } from 'src/companies/entities/company.entity';
import { Bank } from 'src/banks/entities/bank.entity';
import { CreditCard } from 'src/credit-cards/entities/credit-card.entity';
import { BillingAddress } from 'src/billing-addresses/entities/billing-address.entity';
import { Survey } from 'src/surveys/entities/survey.entity';
import { File } from 'src/files/entities/file.entity';

@Injectable()
export class SellerOnboardingService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>,
    @InjectRepository(CreditCard) private readonly creditCardRepository: Repository<CreditCard>,
    @InjectRepository(BillingAddress) private readonly billingAddressRepository: Repository<BillingAddress>,
    @InjectRepository(Survey) private readonly surveyRepository: Repository<Survey>,
    @InjectRepository(File) private readonly fileRepository: Repository<File>,

  ) {}

  private async generateUniqueSlug(entityName: string, companyId?: string): Promise<string> {
    let slugBase = entityName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  
    let slug = slugBase;
    let counter = 1;
  
    while (true) {
      const existing = await this.companyRepository.findOne({
        where: {
          slug,
          ...(companyId ? { id: Not(companyId) } : {}) // Skip checking current company if updating
        },
      });
  
      if (!existing) break;
  
      slug = `${slugBase}-${counter++}`;
    }
  
    return slug;
  }
  
  

  async create(
    createOnboardingDto: CreateSellerOnboardingDto,
    userId: string
  ): Promise<{
      status: string;
      message: string,
      data : any
    }> {
    const { 
      basicInfo, 
      company, 
      bankInfo,
      creditCard,
      billingAddress,
      survey,
      file
    } = createOnboardingDto;

      // 1. User Data
      // Find the user
      let existingUser = await this.usersRepository.findOne({ where: { id: userId } });
      if (existingUser) {
        existingUser.firstName = basicInfo?.firstName ?? existingUser.firstName;
        existingUser.lastName = basicInfo?.lastName ?? existingUser.lastName;
        existingUser.dob = basicInfo?.dob ? new Date(basicInfo?.dob) : existingUser.dob;
        existingUser.phone = basicInfo?.phone ?? existingUser.phone;
        existingUser.isSellerOnboardingFormFilled1 = true;

        await this.usersRepository.save(existingUser);
      } else {
          return { status: 'error', message: 'User not found', data: null };
      }
      
      // 2. Company Data
      // Check if a company already exists for this user
      let existingCompany = await this.companyRepository.findOne({ where: { user: { id: existingUser.id } } });
      if (existingCompany) {
        existingCompany.entityName = company?.entityName ?? existingCompany.entityName;
        existingCompany.legalName = company?.legalName ?? existingCompany.legalName;
        existingCompany.ein = company?.ein ?? existingCompany.ein;
        existingCompany.website = company?.website ?? existingCompany.website;
        existingCompany.address1 = company?.address1 ?? existingCompany.address1;
        existingCompany.address2 = company?.address2 ?? existingCompany.address2;
        existingCompany.city = company?.city ?? existingCompany.city;
        existingCompany.state = company?.state ?? existingCompany.state;
        existingCompany.country = company?.country ?? existingCompany.country;
        existingCompany.zip = company?.zip ?? existingCompany.zip;
        existingCompany.gmv = company?.gmv ?? existingCompany.gmv;
        existingCompany.category = company?.category ?? existingCompany.category;
        existingCompany.businessPhone = company?.businessPhone ?? existingCompany.businessPhone;
        existingCompany.isOnboardingFormFilled = company?.isOnboardingFormFilled ?? existingCompany.isOnboardingFormFilled;

        // Generate slug
        existingCompany.slug = await this.generateUniqueSlug(existingCompany.entityName, existingCompany.id);

        // Update existing company
        await this.companyRepository.save(existingCompany);
      }

      // 3. Bank 
      // Update First Record
      if (bankInfo) {
        let existingBanks = await this.bankRepository.find({ where: { user: { id: existingUser.id } } });
        let bankToUpdate = existingBanks[0]; // Get first bank if exists

        if (bankToUpdate) {
          Object.assign(bankToUpdate, bankInfo);
          await this.bankRepository.save(bankToUpdate);
        } else {
          const newBank = this.bankRepository.create({ user: existingUser, ...bankInfo });
          await this.bankRepository.save(newBank);
        }
      }

      // 4. Credit Card
      // Update First Record
      if (creditCard) {
        let existingCreditCards = await this.creditCardRepository.find({ where: { user: { id: existingUser.id } } });
        let cardToUpdate = existingCreditCards[0]; // Get first credit card if exists

        if (cardToUpdate) {
          Object.assign(cardToUpdate, creditCard);
          await this.creditCardRepository.save(cardToUpdate);
        } else {
          const newCreditCard = this.creditCardRepository.create({ user: existingUser, ...creditCard });
          await this.creditCardRepository.save(newCreditCard);
        }
      }
      
      // 5. Billing Address
      // Update or Create Billing Address
      if (billingAddress) {
        let existingBillingAddress = await this.billingAddressRepository.find({where: { user: { id: existingUser.id } },});
        let billingToUpdate = existingBillingAddress[0];

        if (billingToUpdate) {
          Object.assign(billingToUpdate, billingAddress);
          await this.billingAddressRepository.save(billingToUpdate);
        } else {
          const newBillingAddress = this.billingAddressRepository.create({ user: existingUser, ...billingAddress });
          await this.billingAddressRepository.save(newBillingAddress);
        }
      }

      // 6. Billing Address
      // Update or Create Survey
      // Check if a survey already exists for this user
      if (survey) {
        let existingSurvey = await this.surveyRepository.findOne({ where: { user: { id: existingUser.id } } });
    
        // No need to stringify the challenges array now
        const surveyData = {
            ...survey,
            challenges: survey.challenges || [],
            painPoints: survey.painPoints || [],
            arOutcome: survey.arOutcome || [],
            envision: survey.envision || [],
            seekFunction: survey.seekFunction || [],
            criteria: survey.criteria || [],
        };
    
        if (existingSurvey) {
            Object.assign(existingSurvey, surveyData);
            await this.surveyRepository.save(existingSurvey);
        } else {
            const newSurvey = this.surveyRepository.create({
                user: { id: existingUser.id },
                ...surveyData,
            });
            await this.surveyRepository.save(newSurvey);
        }
      }

      // 7. Files
      // Handle file data
      if (file && Array.isArray(file)) {
          // Delete all existing files
          await this.fileRepository.delete({ user: existingUser });

          // Insert new files
          for (const fileObj of file) {
              if (fileObj.url) {
                  const newFile = this.fileRepository.create({
                      user: existingUser,
                      url: fileObj.url,
                  });
                  await this.fileRepository.save(newFile);
              }
          }
      }

      return {
        status: 'success',
        message: 'Form data saved successfully',
        data: {
          basicInfo,
          company,
          bankInfo,
          creditCard,
          billingAddress,
          survey,
          file
        },
      };
  };

  findAll() {
    return `This action returns all sellerOnboarding`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sellerOnboarding`;
  }

  update(id: number, updateSellerOnboardingDto: UpdateSellerOnboardingDto) {
    return `This action updates a #${id} sellerOnboarding`;
  }

  remove(id: number) {
    return `This action removes a #${id} sellerOnboarding`;
  }
}
