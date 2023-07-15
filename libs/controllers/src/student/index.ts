import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateStudentDto,
  JwtAuthGuard,
  TReqToken,
  UpdateStudentDto,
} from '@uninus/entities';
import { StudentService } from '@uninus/services';
import {
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiOperation,
  ApiBearerAuth,
} from '@nestjs/swagger';

@Controller('student')
@ApiTags('Student')
export class StudentController {
  constructor(private readonly appService: StudentService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Data Student' })
  @ApiResponse({
    status: 400,
    description: 'User tidak ditemukan',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  createData(
    @Request() reqToken: TReqToken,
    @UploadedFile() Image: Express.Multer.File,
    @Body() studentData: CreateStudentDto
  ) {
    const { sub } = reqToken.user;
    return this.appService.createStudent(sub, Image, studentData);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get Data Student' })
  @ApiResponse({
    status: 400,
    description: 'Data tidak ditemukan',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseGuards(JwtAuthGuard)
  getData(@Request() reqToken: TReqToken) {
    const { sub } = reqToken.user;
    return this.appService.getStudent(sub);
  }

  @Put()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Data Student' })
  @ApiResponse({
    status: 400,
    description: 'User tidak ditemukan',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtAuthGuard)
  updateData(
    @Request() reqToken: TReqToken,
    @UploadedFile() Image: Express.Multer.File,
    @Body() studentData: UpdateStudentDto
  ) {
    const { sub } = reqToken.user;
    return this.appService.updateStudent(sub, Image, studentData);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete By Id' })
  @ApiResponse({
    status: 400,
    description: 'User tidak ditemukan',
  })
  deleteDataById(@Param('id') id: string) {
    return this.appService.deleteStudent(id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update By Id' })
  @ApiResponse({
    status: 400,
    description: 'User tidak ditemukan',
  })
  updateDataById(
    @Param('id') id: string,
    @UploadedFile() Image: Express.Multer.File,
    @Body() studentData: UpdateStudentDto
  ) {
    return this.appService.updateStudent(id, Image, studentData);
  }
}
