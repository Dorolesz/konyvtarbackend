import { IsInt, IsString } from "class-validator";

export class CreateRentalDto {

    @IsInt()
    book_id: number;

    @IsString()
    start_date: Date;

    @IsString()
    end_date: Date;
}
