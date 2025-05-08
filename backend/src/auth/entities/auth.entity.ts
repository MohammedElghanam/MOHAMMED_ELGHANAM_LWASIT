import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Auth {

    @Prop()
    name: string;

    @Prop({ unique:[true, 'Duplicate email enterd']})
    email: string;

    @Prop()
    password: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
