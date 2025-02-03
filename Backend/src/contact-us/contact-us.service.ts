import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactUs } from './entities/contact-us.entity';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';

@Injectable()
export class ContactUsService {
  constructor(
    @InjectRepository(ContactUs)
    private readonly contactUsRepository: Repository<ContactUs>,
  ) {}

  async create(createContactUsDto: CreateContactUsDto) {
    const newContact = this.contactUsRepository.create(createContactUsDto);
    await this.contactUsRepository.save(newContact);
    return { status: 'success', message: 'Your message has been received.' };
  }

  async findAll() {
    return await this.contactUsRepository.find();
  }

  async findOne(id: string) {
    const contact = await this.contactUsRepository.findOne({ where: { id } });
    if (!contact) throw new NotFoundException(`Contact request #${id} not found`);
    return contact;
  }

  async update(id: string, updateContactUsDto: UpdateContactUsDto) {
    const contact = await this.findOne(id);
    Object.assign(contact, updateContactUsDto);
    await this.contactUsRepository.save(contact);
    return { status: 'success', message: `Contact request #${id} updated.` };
  }

  async remove(id: string) {
    const contact = await this.findOne(id);
    await this.contactUsRepository.remove(contact);
    return { status: 'success', message: `Contact request #${id} deleted.` };
  }
}
