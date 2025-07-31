import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import {
  GetAllUsersDoc,
  GetUserByIdDoc,
  CreateUserDoc,
  UpdateUserDoc,
  DeleteUserDoc,
} from "../../swagger-docs/users.docs";
import { UpdateUserDTO } from "./dto/update-users.dto";

@Controller("users")
export class UsersController {
  constructor(
    private readonly usersService: UsersService) {}

  @Get()
  @GetAllUsersDoc()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @GetUserByIdDoc()
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Post()
  @CreateUserDoc()
  create(@Body() createUserDto: Partial<User>) {
    return this.usersService.create(createUserDto);
  }
//--------------------------------------------recargar y no aparesca al final
  @Patch(":id")
  @UpdateUserDoc()
  async update(
    @Param("id") id: string, 
    @Body() updateUserDto: UpdateUserDTO
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(":id")
  @DeleteUserDoc()
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
