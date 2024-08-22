import { ConfigModule } from "@nestjs/config";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { User, UserSchema } from "../src/users/schema/user.schema";
import { UserService } from "../src/users/user.service"
import { UserRepository } from "../src/users/user.repository";
import { UsersModule } from "../src/users/users.module";
import UserAdapter from "../src/users/user.adapter";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { Connection } from "mongoose";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "../src/auth/auth.module";

describe('UserService (e2e)', () => {
    let app: INestApplication;
    let userService: UserService;
    let userRepository: UserRepository;
    let module: TestingModule;
    let connection: Connection;
    let jwtService: JwtService;
    let authToken: string;

    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot(),
                MongooseModule.forRoot(`mongodb://0.0.0.0:27017/magic-the-gatering-TEST`),
                MongooseModule.forFeature([{
                    name: User.name,
                    schema: UserSchema
                }]),
                UsersModule,
                AuthModule
            ],
            providers: [UserService, UserRepository, UserAdapter],
        }).compile();
        
        app = module.createNestApplication();
        await app.init();

        userService = module.get<UserService>(UserService);
        userRepository = module.get<UserRepository>(UserRepository);
        connection = module.get(getConnectionToken());
        jwtService = module.get<JwtService>(JwtService);

        authToken = jwtService.sign({ username: 'mockuser2'})
    })

    afterAll(async () => {
        await connection.close();
        await app.close();
    });


    
    it('/POST should create a user', async () => {
        const user = {
            email: "mockemail2@gmail.com",
            password: "mockpassword",
            username: "mockuser2",
        };

        await request(app.getHttpServer())
            .post('/users')
            .set('Authorization', `Bearer ${authToken}`)
            .send(user)
            .expect(201);
         const createdUser = await userRepository.findByUsernameOrEmail(user.email, user.username);
            expect(createdUser).toBeDefined();
            expect(createdUser.email).toEqual(user.email);
            expect(createdUser.username).toEqual(user.username);
       
    });

    it('/GET should find all users', async () => {
        const users = await userRepository.findAll();

        await request(app.getHttpServer())
            .get('/users')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);
        
        expect(users).toBeDefined();
        expect(users[0].username).toEqual("mockuser2");
    });

    it('/PUT should update user', async () => {
        const user = await userRepository.findByUsernameOrEmail("mockemail2@gmail.com");
        const id = user._id.toString();
        const updatedUser = {
            username: "mockuser3"
        }
        await request(app.getHttpServer())
            .put(`/users/${id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(updatedUser)
            .expect(200)
    })

    it('/DELETE should delete user', async () => {
        const user = await userRepository.findByUsernameOrEmail("mockemail2@gmail.com");
        const id = user._id;
        await request(app.getHttpServer())
            .delete(`/users/${id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200)
    });
});