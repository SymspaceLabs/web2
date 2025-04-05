import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateSurveyDto {
  @IsString()
  industry: string;

  @IsString()
  role: string;

  @IsString()
  employees: string;

  @IsString()
  avgReturn: string;

  @IsString()
  highReturn: string;

  @IsArray()
  @IsString({ each: true })
  challenges: string[];

  @IsArray()
  @IsString({ each: true })
  painPoints: string[];

  @IsString()
  arAd: string;

  @IsString()
  gain: string;

  @IsString()
  threeDProduct: string;

  @IsString()
  integrate3d: string;

  @IsString()
  prevAr: string;

  @IsArray()
  @IsString({ each: true })
  arOutcome: string[];

  @IsString()
  current3d: string;

  @IsString() //SINGLE-SELECT
  generate3d: string;

  @IsArray()
  @IsString({ each: true })
  envision: string[];

  @IsArray()
  @IsString({ each: true })
  seekFunction: string[];

  @IsString()
  moreInformed: string;

  @IsString()
  conversionRate: string;

  @IsArray()   //MULTI-SELECT
  @IsString({ each: true })
  criteria: string[];

  @IsString()  //SINGLE-SELECT
  concerns: string;

  @IsString()  //SINGLE-SELECT
  upcoming: string;

  @IsString()
  @IsOptional()
  question?: string;
}
