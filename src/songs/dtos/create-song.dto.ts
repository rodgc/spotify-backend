import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  readonly artists;

  @IsDateString()
  @IsNotEmpty()
  readonly releaseDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty()
  @IsString()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics?: string;
}
