import { Injectable, NotFoundException } from '@nestjs/common';
import { CompaniesService } from 'src/companies/companies.service';

@Injectable()
export class AdminCompaniesService {
  constructor(private readonly companiesService: CompaniesService) {}

  /**
   * Retrieves all user accounts in the system.
   * NOTE: The controller ensures only Admins can call this.
   */
  async findAllCompanies() {
    // This is where you might call a method from your core UsersService
    // that fetches ALL users, including sensitive data.
    return this.companiesService.findAll(); 
  }

  async findOneCompany(id: string) {
    // 1. Fetch the company from the database
    const company = await this.companiesService.findOne(id);

    // 2. Handle not found scenario
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found.`);
    }

    return company;
  }

}