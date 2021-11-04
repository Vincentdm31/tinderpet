import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  getAll() {
    return this.petService.getAll();
  }
  @Get('pet-types')
  getPetType() {
    return this.petService.getPetType();
  }
  @Post('new')
  newPet(@Body('test') pet) {
    return this.petService.newPet(pet);
  }
  @Post('editPet')
  editPet(@Body() pet) {
    return this.petService.editPet(pet);
  }
}
