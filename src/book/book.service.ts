import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}
  
  async create(createBookDto: CreateBookDto) {
    return this.prisma.books.create({
      data: createBookDto,
      });
  }

  async findAll() {
    return this.prisma.books.findMany({ 
      select: {
        id: true,
        title: true,
        author: true,
        publish_year: true,
        page_count: true,
      },
    });
  }

  async rentBook(bookId: number) {
    const book = await this.prisma.books.findUnique({
       where: { id: bookId } 
    });

    if (!book) {
      throw new NotFoundException({ message: 'A könyv nem található.' });
    }

    const now = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(now.getDate() + 7);

    const overlappingRental = await this.prisma.rentals.findFirst({
      where: {
        book_id: bookId,
        start_date: { lte: now },
        end_date: { gte: now },
      },
    });

    if (overlappingRental) {
      throw new ConflictException({
        message: 'A könyv jelenleg nem elérhető kölcsönzésre.',
      });
    }

    const newRental = await this.prisma.rentals.create({
      data: {
        book_id: bookId,
        start_date: now,
        end_date: oneWeekLater,
      },
      select: {
        id: true,
        book_id: true,
        start_date: true,
        end_date: true,
      },
    });

    return newRental;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
