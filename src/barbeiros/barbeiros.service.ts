import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { Barbeiros } from "./models/barbeiro.model"; 
import { NewBabeiroInput } from "./dto/new-barbeiro.input";

@Injectable()
export class BarbeirosService {
    constructor(
        @InjectRepository(Barbeiros)
        private barbeirosRepository: Repository<Barbeiros>,
    ) {}

    async findAll(): Promise<Barbeiros[]> {
        return await this.barbeirosRepository.find({relations: ['agendamentos']});
    }

    async findById(id: number): Promise<Barbeiros> {
        return await this.barbeirosRepository.findOne({
            where: {
                id
            },
            relations: ['agendamentos'],
        });
    }

    async create(barbeiro: NewBabeiroInput): Promise<Barbeiros> {
        return await this.barbeirosRepository.save(barbeiro);
    }
}