import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { PetService } from './pet.service';
import { IUser } from '@tinderpet/user';

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
  @Get('/delete/all')
  deleteAllPets() {
    return this.petService.deleteAllPets();
  }
  @Get(':id')
  getPetById(@Param() data) {
    return this.petService.getPetById(data.id);
  }

  @Post('new')
  newPet(@Body() pet: IUser) {
    return this.petService.newPet(pet);
  }
  @Post('editPet')
  editPet(@Body() pet: IUser) {
    return this.petService.editPet(pet);
  }
  @Delete(':id')
  deletePet(@Param() pet) {
    return this.petService.deletePet(pet);
  }
}
