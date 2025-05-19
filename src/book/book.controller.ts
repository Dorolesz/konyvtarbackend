import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException, ParseIntPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('api/books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  async create(@Body() createBookDto: CreateBookDto) {
    try {
      const book = await this.bookService.create(createBookDto);
      return {
        id: book.id,
        title: book.title,
        author: book.author,
        publish_year: book.publish_year,
        page_count: book.page_count,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Hiba történt a könyv létrehozása során.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':id/rent')
  rentBook(@Param('id', ParseIntPipe) id: number) {
    return this.bookService.rentBook(id);
  }


  @Get()
  async findAll() {
    try {
      const books = await this.bookService.findAll();
      const data = books.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        publish_year: book.publish_year,
        page_count: book.page_count,
      }));
      return { data };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Hiba történt a könyvek lekérése során.',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
