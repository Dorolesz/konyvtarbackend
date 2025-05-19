import { IsInt, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    title: string;

    @IsString()
    author: string;
    
    @IsInt()
    publish_year: number;

    @IsInt()
    page_count: number;
}
