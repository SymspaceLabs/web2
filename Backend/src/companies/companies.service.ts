import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
import { calculateDisplayPrice } from 'src/products/utils/price-calculation.utils';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
    private readonly productsService: ProductsService
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const company = this.companiesRepository.create(createCompanyDto);
    return await this.companiesRepository.save(company);
  }

  async findAll(hasProductsOnly?: boolean): Promise<Company[]> {
    const companies = await this.companiesRepository.find({
      relations: ['user', 'products'],
    });

    if (hasProductsOnly) {
      return companies.filter(company => company.products && company.products.length > 0);
    }

    return companies;
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.companiesRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async findBySlug(slug: string): Promise<any> {
    const company = await this.companiesRepository.findOne({ where: { slug } });

    if (!company) {
      throw new NotFoundException(`Company with slug ${slug} not found`);
    }

    // Call the same findAll used by the products endpoint
    const { products } = await this.productsService.findAll(
      {}, // QueryContext - no auth context needed for public store
      undefined, // searchTerm
      undefined, // categorySlug
      undefined, // subcategorySlug
      undefined, // subcategoryItemSlugs
      undefined, // subcategoryItemChildSlug
      undefined, // genders
      undefined, // ageGroups
      company.id, // ← companyId filter
    );

    return {
      ...company,
      products,
    };
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    await this.companiesRepository.update(id, updateCompanyDto);
    const updatedCompany = await this.companiesRepository.findOne({
      where: { id },
    });
    if (!updatedCompany) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return updatedCompany;
  }

  async remove(id: string): Promise<{ message: string }> {
    const deleteResult = await this.companiesRepository.delete(id);
    if (!deleteResult.affected) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return { message: `Company with ID ${id} has been successfully deleted` };
  }
  
}
