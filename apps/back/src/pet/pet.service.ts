import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { IUser } from '@tinderpet/user';
import { IUserId } from '@tinderpet/user';
@Injectable()
export class PetService {
  api_url = 'https://meetapet-api.herokuapp.com/api/';
  async getAll(): Promise<Axios> {
    return await axios
      .get(this.api_url + 'pets', {
        params: {
          size: 100,
        },
      })
      .then((pet) => pet.data)
      .catch((err) => console.log(err));
  }
  async getPetType(): Promise<Array<string>> {
    return await axios.get(this.api_url + 'pet-types').then((pet) => pet.data);
  }
  async newPet(data) {
    const pet = data.pet;
    return await axios
      .post(`${this.api_url}pets`, {
        firstName: pet.firstName,
        lastName: pet.lastName,
        birthDate: pet.birthDate,
        type: pet.type,
        avatarPictureUrl: pet.avatarPictureUrl,
        coverPictureUrl: pet.avatarPictureUrl,
        summary: pet.summary,
      })
      .then((item) => console.log('Pet inserted', item.data))
      .catch((err) => console.error('Error during inserting new pet', err));
  }
  async editPet(pet) {
    return await axios
      .put(`${this.api_url}pets/${pet.id}`, pet)
      .then((pet) => pet.data)
      .catch((err) => console.log('ERR', err));
  }
  async deletePet(id: number) {
    return await axios
      .delete(`${this.api_url}pets/${id}`)
      .then((res) => console.log('Pet deleted'))
      .catch((err) => console.error('Error during pet deletion'));
  }
  async getPetById(id) {
    return await axios.get(`${this.api_url}pets/${id}`).then((pet) => pet.data);
  }
  async deleteAllPets() {
    return await axios
      .get(`${this.api_url}pets`, {
        params: {
          size: 100,
        },
      })
      .then((pet) => {
        pet.data.forEach((el) => {
          this.deletePet(el.id);
        });
      })
      .catch((err) => console.log(err));
  }
}
