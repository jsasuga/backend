import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { Case } from './case.entity';
import { CreateCaseDto, UpdateCaseDto } from './case.dto';
import { User } from '../user/user.entity';
import { Provider } from '../provider/provider.entity';
import { Victim } from '../victim/victim.entity';
import { SurvivorEvaluation } from '../survivor-evaluation/survivor-evaluation.entity';
import { DemographicForm } from '../demographic-form/demographic-form.entity';
import { AttentionProtocol } from '../attention-protocol/attention-protocol.entity';
import { Province } from '../province/province.entity';
import { FollowUpNote } from '../follow-up-note/follow-up-note.entity';
import { CreateVictimDto, UpdateVictimDto } from '../victim/victim.dto';
import { CreateDemographicFormDto } from '../demographic-form/demographic-form.dto';
import { CreateSurvivorEvaluationDto } from '../survivor-evaluation/survivor-evaluation.dto';
import { CreateAttentionProtocolDto } from '../attention-protocol/attention-protocol.dto';
import * as bcrypt from 'bcryptjs';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CaseService {
  @InjectRepository(Case)
  private readonly repository: Repository<Case>;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Provider) private providerRepository: Repository<Provider>,
    @InjectRepository(Victim) private victimRepository: Repository<Victim>,
    @InjectRepository(DemographicForm) private demographicFormRepository: Repository<DemographicForm>,
    @InjectRepository(SurvivorEvaluation) private survivorEvaluationRepository: Repository<SurvivorEvaluation>,
    @InjectRepository(AttentionProtocol) private attentionProtocolRepository: Repository<AttentionProtocol>,
    @InjectRepository(Province) private provinceRepository: Repository<Province>,
    @InjectRepository(FollowUpNote) private followUpNoteRepository: Repository<FollowUpNote>,
    @Inject(ConfigService) private config: ConfigService
  ) { }

  private makePassword(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$./!&*';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  private encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public async registerUser(email: string, name: string, victimId: number): Promise<User | never> {
    let password = this.makePassword(10);
    let user: User = await this.userRepository.findOne({ where: { email } });
    let victim: Victim = await this.victimRepository.findOne({ where: { id: victimId } });

    if (user) {
      return user;
    }

    user = new User();

    user.name = name;
    user.email = email;
    user.victim = victim;
    user.password = this.encodePassword(password);
    return this.userRepository.save(user);
  }

  public async createVictimObject(body: CreateVictimDto): Promise<Victim> {
    let victim: Victim = new Victim;
    let vv: Victim = await this.victimRepository.findOne({ where: { id: body.id } });

    if (vv) {
      return this.updateVictim(vv.id, body);
    }
    if (!body.id) {
      throw new HttpException('victim id is required', HttpStatus.BAD_REQUEST);
    }

    victim.id = body.id;
    victim.name = body.name;
    victim.email = body.email;
    victim.otherName = body.otherName;
    victim.age = body.age;
    victim.verifiedAge = body.verifiedAge;
    victim.birthday = body.birthday;
    victim.citizenship = body.citizenship;
    victim.ethnicity = body.ethnicity;
    victim.nationality = body.nationality;
    victim.maritalStatus = body.maritalStatus;
    victim.children = body.children;
    victim.originAddress = body.originAddress;
    victim.originCountry = body.originCountry;
    victim.currentAddress = body.currentAddress;
    victim.phoneNumber = body.phoneNumber;
    victim.preferredLanguage = body.preferredLanguage;
    victim.genre = body.genre;

    return this.victimRepository.save(victim);
  }

  public async createVictim(body: CreateVictimDto): Promise<Victim> {
    let victim = await this.createVictimObject(body);
    if (!victim) {
      throw new HttpException('Error creating the victim', HttpStatus.BAD_REQUEST);
    }
    let user = await this.registerUser(body.email, body.name, victim.id);
    if (!user) {
      throw new HttpException('Error creating the victims user', HttpStatus.BAD_REQUEST);
    }
    // process email sending bs for victim to get his pw
    return victim;
  }

  public async updateVictim(id: number, body: UpdateVictimDto): Promise<Victim> {
    let victim: Victim = await this.victimRepository.findOne(id);

    victim.name = body.name ? body.name : victim.name;
    victim.email = body.email ? body.email : victim.email;
    victim.otherName = body.otherName ? body.otherName : victim.otherName;
    victim.age = body.age ? body.age : victim.age;
    victim.verifiedAge = body.verifiedAge ? body.verifiedAge : victim.verifiedAge;
    victim.birthday = body.birthday ? body.birthday : victim.birthday;
    victim.citizenship = body.citizenship ? body.citizenship : victim.citizenship;
    victim.ethnicity = body.ethnicity ? body.ethnicity : victim.ethnicity;
    victim.nationality = body.nationality ? body.nationality : victim.nationality;
    victim.maritalStatus = body.maritalStatus ? body.maritalStatus : victim.maritalStatus;
    victim.children = body.children ? body.children : victim.children;
    victim.originAddress = body.originAddress ? body.originAddress : victim.originAddress;
    victim.originCountry = body.originCountry ? body.originCountry : victim.originCountry;
    victim.currentAddress = body.currentAddress ? body.currentAddress : victim.currentAddress;
    victim.phoneNumber = body.phoneNumber ? body.phoneNumber : victim.phoneNumber;
    victim.preferredLanguage = body.preferredLanguage ? body.preferredLanguage : victim.preferredLanguage;
    victim.genre = body.genre ? body.genre : victim.genre;

    return this.victimRepository.save(victim);
  }

  public async createDemographicForm(body: CreateDemographicFormDto): Promise<DemographicForm> {
    let demographicForm: DemographicForm = new DemographicForm;

    let user: User = await this.userRepository.findOne(body.userInChargeId);
    if (!user) {
      throw new HttpException('Invalid userInChargeId on demographicForm', HttpStatus.BAD_REQUEST);
    }

    demographicForm.participation = body.participation;
    demographicForm.commitment = body.commitment;
    demographicForm.comments = body.comments;
    demographicForm.description = body.description;

    demographicForm.userInCharge = user;
    demographicForm.createdAt = new Date();

    return this.demographicFormRepository.save(demographicForm);
  }

  public async createSurvivorEvaluation(body: CreateSurvivorEvaluationDto): Promise<SurvivorEvaluation> {
    let object: SurvivorEvaluation = new SurvivorEvaluation;

    let user: User = await this.userRepository.findOne(body.userInChargeId);
    if (!user) {
      throw new HttpException('Invalid userInChargeId on survivorEvaluation', HttpStatus.BAD_REQUEST);
    }

    let province: Province = await this.provinceRepository.findOne(body.provinceId);
    if (!province) {
      throw new HttpException('Invalid provinceId on survivorEvaluation', HttpStatus.BAD_REQUEST);
    }

    object.violenceType = body.violenceType;
    object.place = body.place;
    object.phase = body.phase;
    object.security1 = body.security1;
    object.security2 = body.security2;
    object.security3 = body.security3;
    object.securityNotes = body.securityNotes;
    object.legalProtection1 = body.legalProtection1;
    object.legalProtection2 = body.legalProtection2;
    object.legalProtection3 = body.legalProtection3;
    object.legalProtectionNotes = body.legalProtectionNotes;
    object.mentalWelfare1 = body.mentalWelfare1;
    object.mentalWelfare2 = body.mentalWelfare2;
    object.mentalWelfare3 = body.mentalWelfare3;
    object.mentalWelfare4 = body.mentalWelfare4;
    object.mentalWelfareNotes = body.mentalWelfareNotes;
    object.social1 = body.social1;
    object.social2 = body.social2;
    object.social3 = body.social3;
    object.social4 = body.social4;
    object.socialNotes = body.socialNotes;
    object.physical1 = body.physical1;
    object.physical2 = body.physical2;
    object.physical3 = body.physical3;
    object.physical4 = body.physical4;
    object.physical5 = body.physical5;
    object.physicalNotes = body.physicalNotes;
    object.financial1 = body.financial1;
    object.financial2 = body.financial2;
    object.financial3 = body.financial3;
    object.financial4 = body.financial4;
    object.financialNotes = body.financialNotes;
    object.total = body.total;
    object.survivorStatus = body.survivorStatus;
    object.createdAt = new Date();
    object.securityTotal = body.securityTotal;
    object.legalProtectionTotal = body.legalProtectionTotal;
    object.mentalWelfareTotal = body.mentalWelfareTotal;
    object.financial = body.financial;
    object.social = body.social;
    object.physical = body.physical;

    object.userInCharge = user;
    object.province = province;
    object.completed = false;

    return this.survivorEvaluationRepository.save(object);
  }

  public async createAttentionProtocol(body: CreateAttentionProtocolDto): Promise<AttentionProtocol> {
    let object: AttentionProtocol = new AttentionProtocol;

    let user: User = await this.userRepository.findOne(body.userInChargeId);
    if (!user) {
      throw new HttpException('Invalid userInChargeId in attentionProtocol', HttpStatus.BAD_REQUEST);
    }

    object.data = body.data;
    object.confidentiality = body.confidentiality;
    object.consent = body.consent;
    object.treatment = body.treatment;
    object.security = body.security;
    object.legalProtection = body.legalProtection;
    object.mental = body.mental;
    object.financial = body.financial;
    object.social = body.social;
    object.physical = body.physical;
    object.strengths = body.strengths;
    object.comments = body.comments;
    object.createdAt = new Date();
    object.userInCharge = user;

    return this.attentionProtocolRepository.save(object);
  }

  public async create(body: CreateCaseDto): Promise<Case> {
    let object: Case = new Case;

    let user: User = await this.userRepository.findOne(body.userInChargeId);
    if (!user) {
      throw new HttpException('Invalid userInChargeId in case', HttpStatus.BAD_REQUEST);
    }

    let consentUser: User = await this.userRepository.findOne(body.consentUserInChargeId);
    if (!consentUser) {
      throw new HttpException('Invalid consentUserInChargeId in case', HttpStatus.BAD_REQUEST);
    }

    let followUpUserInCharge: User = await this.userRepository.findOne(body.followUpUserInChargeId);
    if (!followUpUserInCharge) {
      throw new HttpException('Invalid followUpUserInChargeId in case', HttpStatus.BAD_REQUEST);
    }

    let provider: Provider = await this.providerRepository.findOne(body.providerId);
    if (!provider) {
      throw new HttpException('Invalid providerId in case', HttpStatus.BAD_REQUEST);
    }

    let victim = await this.createVictim(body.victim);
    let demographicForm = await this.createDemographicForm(body.demographicForm);
    let initialSurvivorEvaluation = await this.createSurvivorEvaluation(body.initialSurvivorEvaluation);
    let finalSurvivorEvaluation = await this.createSurvivorEvaluation(body.finalSurvivorEvaluation);
    let postSurvivorEvaluation = await this.createSurvivorEvaluation(body.postSurvivorEvaluation);
    let attentionProtocol = await this.createAttentionProtocol(body.attentionProtocol);

    object.description = body.description;
    object.victim = victim;
    object.provider = provider;
    object.userInCharge = user;
    object.consent = body.consent;
    object.demographicForm = demographicForm;
    object.initialSurvivorEvaluation = initialSurvivorEvaluation;
    object.finalSurvivorEvaluation = finalSurvivorEvaluation;
    object.postSurvivorEvaluation = postSurvivorEvaluation;
    object.attentionProtocol = attentionProtocol;
    object.followUpUserInCharge = followUpUserInCharge;
    object.completed = false;
    object.inactive = false;
    object.code = body.code;
    object.consentUserInCharge = consentUser;
    object.jurisdiction = body.jurisdiction;
    object.defendant = body.defendant;
    object.defendantId = body.defendantId;
    object.proceduralStage = body.proceduralStage;
    object.legalScore = body.legalScore;
    object.userCode = body.userCode;
    object.createdAt = new Date();

    try {
      this.createSicempCase(object);
    } catch (error) {
    }
    return this.repository.save(object);
  }

  public async list(req: Request): Promise<Array<Case>> {
    return this.repository.find({
      relations: [
        "victim",
        "provider",
        "userInCharge",
        "consentUserInCharge",
        "demographicForm",
        "demographicForm.userInCharge",
        "demographicForm.userInCharge.provider",
        "initialSurvivorEvaluation",
        "initialSurvivorEvaluation.userInCharge",
        "initialSurvivorEvaluation.userInCharge.provider",
        "finalSurvivorEvaluation",
        "finalSurvivorEvaluation.userInCharge",
        "finalSurvivorEvaluation.userInCharge.provider",
        "postSurvivorEvaluation",
        "postSurvivorEvaluation.userInCharge",
        "postSurvivorEvaluation.userInCharge.provider",
        "attentionProtocol",
        "attentionProtocol.userInCharge",
        "attentionProtocol.userInCharge.provider",
        "followUpUserInCharge",
        "followUpNotes",
        "comments",
        "comments.user",
        "comments.user.victim",
        "followUps"
      ]
    });
  }

  public async listByProviderId(providerId: string): Promise<Array<Case>> {
    return this.repository.find({
      relations: [
        "victim",
        "provider",
        "userInCharge",
        "consentUserInCharge",
        "demographicForm",
        "demographicForm.userInCharge",
        "demographicForm.userInCharge.provider",
        "initialSurvivorEvaluation",
        "initialSurvivorEvaluation.userInCharge",
        "initialSurvivorEvaluation.userInCharge.provider",
        "finalSurvivorEvaluation",
        "finalSurvivorEvaluation.userInCharge",
        "finalSurvivorEvaluation.userInCharge.provider",
        "postSurvivorEvaluation",
        "postSurvivorEvaluation.userInCharge",
        "postSurvivorEvaluation.userInCharge.provider",
        "attentionProtocol",
        "attentionProtocol.userInCharge",
        "attentionProtocol.userInCharge.provider",
        "followUpUserInCharge",
        "followUpNotes",
        "comments",
        "comments.user",
        "comments.user.victim",
        "followUps"
      ],
      where: [{
        provider: {
          id: providerId
        }
      }]
    })
  }

  public async listByVictimId(victimId: string): Promise<Array<Case>> {
    return this.repository.find({
      relations: [
        "victim",
        "provider",
        "userInCharge",
        "consentUserInCharge",
        "demographicForm",
        "demographicForm.userInCharge",
        "demographicForm.userInCharge.provider",
        "initialSurvivorEvaluation",
        "initialSurvivorEvaluation.userInCharge",
        "initialSurvivorEvaluation.userInCharge.provider",
        "finalSurvivorEvaluation",
        "finalSurvivorEvaluation.userInCharge",
        "finalSurvivorEvaluation.userInCharge.provider",
        "postSurvivorEvaluation",
        "postSurvivorEvaluation.userInCharge",
        "postSurvivorEvaluation.userInCharge.provider",
        "attentionProtocol",
        "attentionProtocol.userInCharge",
        "attentionProtocol.userInCharge.provider",
        "followUpUserInCharge",
        "followUpNotes",
        "comments",
        "comments.user",
        "comments.user.victim",
        "followUps"
      ],
      where: [{
        victim: {
          id: victimId
        }
      }]
    })
  }

  public async listByUserId(userId: string): Promise<Array<Case>> {
    return this.repository.find({
      relations: [
        "victim",
        "provider",
        "userInCharge",
        "consentUserInCharge",
        "demographicForm",
        "demographicForm.userInCharge",
        "demographicForm.userInCharge.provider",
        "initialSurvivorEvaluation",
        "initialSurvivorEvaluation.userInCharge",
        "initialSurvivorEvaluation.userInCharge.provider",
        "finalSurvivorEvaluation",
        "finalSurvivorEvaluation.userInCharge",
        "finalSurvivorEvaluation.userInCharge.provider",
        "postSurvivorEvaluation",
        "postSurvivorEvaluation.userInCharge",
        "postSurvivorEvaluation.userInCharge.provider",
        "attentionProtocol",
        "attentionProtocol.userInCharge",
        "attentionProtocol.userInCharge.provider",
        "followUpUserInCharge",
        "followUpNotes",
        "comments",
        "comments.user",
        "comments.user.victim",
        "followUps"
      ],
      where: [{
        userInCharge: {
          id: userId
        }
      }]
    })
  }

  public async fetch(id: string): Promise<Case> {
    let obj = await this.repository.findOne(id, {
      relations: [
        "victim",
        "provider",
        "userInCharge",
        "consentUserInCharge",
        "demographicForm",
        "demographicForm.userInCharge",
        "demographicForm.userInCharge.provider",
        "initialSurvivorEvaluation",
        "initialSurvivorEvaluation.userInCharge",
        "initialSurvivorEvaluation.userInCharge.provider",
        "finalSurvivorEvaluation",
        "finalSurvivorEvaluation.userInCharge",
        "finalSurvivorEvaluation.userInCharge.provider",
        "postSurvivorEvaluation",
        "postSurvivorEvaluation.userInCharge",
        "postSurvivorEvaluation.userInCharge.provider",
        "attentionProtocol",
        "attentionProtocol.userInCharge",
        "attentionProtocol.userInCharge.provider",
        "followUpUserInCharge",
        "followUpNotes",
        "comments",
        "comments.user",
        "comments.user.victim",
        "followUps"
      ],
    });
    if (!obj) {
      throw new HttpException('Object not found', HttpStatus.NOT_FOUND);
    }
    return obj;
  }

  public async update(id: string, body: UpdateCaseDto): Promise<Case> {
    let object: Case = await this.repository.findOne(id);
    if (!object) {
      throw new HttpException('Invalid case id', HttpStatus.NOT_FOUND);
    }

    object.description = body.description ? body.description : object.description;
    object.consent = body.consent ? body.consent : object.consent;
    object.code = body.code ? body.code : object.code;
    object.inactive = "inactive" in body ? body.inactive : object.inactive;
    object.jurisdiction = body.jurisdiction ? body.jurisdiction : object.jurisdiction;
    object.defendant = body.defendant ? body.defendant : object.defendant;
    object.defendantId = body.defendantId ? body.defendantId : object.defendantId;
    object.proceduralStage = body.proceduralStage ? body.proceduralStage : object.proceduralStage;
    object.legalScore = body.legalScore ? body.legalScore : object.legalScore;

    if (object.inactive) object.inactiveAt = new Date();

    if (body.completed) {
      object.completed = true;
      object.completedAt = new Date();
    }

    if (body.providerId) {
      let provider: Provider = await this.providerRepository.findOne(body.providerId);
      if (!provider) {
        throw new HttpException('Invalid providerId in case', HttpStatus.BAD_REQUEST);
      }
      object.provider = provider;
    }

    if (body.userInChargeId) {
      let user: User = await this.userRepository.findOne(body.userInChargeId);
      if (!user) {
        throw new HttpException('Invalid userInChargeId in case', HttpStatus.BAD_REQUEST);
      }
      object.userInCharge = user;
    }

    if (body.consentUserInChargeId) {
      let consentUser: User = await this.userRepository.findOne(body.consentUserInChargeId);
      if (!consentUser) {
        throw new HttpException('Invalid consentUserInChargeId in case', HttpStatus.BAD_REQUEST);
      }
      object.consentUserInCharge = consentUser;
    }

    if (body.followUpUserInChargeId) {
      let user: User = await this.userRepository.findOne(body.followUpUserInChargeId);
      if (!user) {
        throw new HttpException('Invalid userInChargeId in case', HttpStatus.BAD_REQUEST);
      }
      object.followUpUserInCharge = user;
    }

    return this.repository.save(object);
  }

  public async delete(id: string): Promise<Case> {
    let object: Case = await this.repository.findOne(id);
    return object.softRemove();
  }

  public async addDemographicForm(id: string, body: CreateDemographicFormDto): Promise<Case> {
    let object: Case = await this.repository.findOne(id);
    if (!object) {
      throw new HttpException('Invalid case id', HttpStatus.NOT_FOUND);
    }

    let demographicForm = await this.createDemographicForm(body);
    object.demographicForm = demographicForm;

    return this.repository.save(object);
  }

  public async addAttentionProtocol(id: string, body: CreateAttentionProtocolDto): Promise<Case> {
    let object: Case = await this.repository.findOne(id);
    if (!object) {
      throw new HttpException('Invalid case id', HttpStatus.NOT_FOUND);
    }

    let attentionProtocol = await this.createAttentionProtocol(body);
    object.attentionProtocol = attentionProtocol;

    return this.repository.save(object);
  }

  public async addSurvivorEvaluation(id: string, when: string, body: CreateSurvivorEvaluationDto): Promise<Case> {
    let object: Case = await this.repository.findOne(id);
    if (!object) {
      throw new HttpException('Invalid case id', HttpStatus.NOT_FOUND);
    }

    let survivorEvaluation = await this.createSurvivorEvaluation(body);

    switch (when) {
      case "initial":
        object.initialSurvivorEvaluation = survivorEvaluation;
        break;
      case "final":
        object.finalSurvivorEvaluation = survivorEvaluation;
        break;
      case "post":
        object.postSurvivorEvaluation = survivorEvaluation;
        break;
      default:
        survivorEvaluation.softRemove();
        break;
    }

    return this.repository.save(object);
  }

  public async searchOnSicempAPI(req: Request): Promise<Array<Case>> {
    try {
      let caseNumber = req.query.caseNumber;
      let userIdentification = req.query.userIdentification;

      let body = caseNumber ? this.searchByCaseNumberSicemp(caseNumber.toString()) : this.searchByUserIdentification(userIdentification.toString());

      const response = await axios.post("https://apisicempdemo.pgr.gob.do/api/v1/casos/search", body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.data.length > 0) {
        let cases = [];

        response.data.data.forEach(c => {
          let cs = new Case();
          let victim = new Victim();
          if (c.tipoDocumento === 1) {
            victim.id = c.documento;
          }
          victim.name = c.denunciante;
          cs.code = c.numero_caso;
          cs.createdAt = c.fecha_creacion;
          cs.jurisdiction = c.despacho;
          cs.proceduralStage = c.etapa;
          cs.victim = victim;
          cases.push(cs);
        });

        return cases;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  private searchByCaseNumberSicemp(caseNumber: string) {
    return {
      "usuarioId": 13139,
      "busquedaCodigo": 2,
      "EsCantidad": false,
      "fechaInicioVacia": true,
      "fechaFinVacia": true,
      "Pagina": 1,
      "CantidadPorPagina": 10,
      "denuncia": {
        "numero": caseNumber,
        "tanda": -1,
        "tipo_origen": -1,
        "fuente": -1,
        "estado": -1,
        "prioridad": -1,
        "registrado_por": ""
      },
      "ubicacion_hecho": {
        "provincia": -1,
        "municipio": -1,
        "distrito": -1,
        "ciudad": -1,
        "sector": -1,
        "calle": ""
      },
      "vinculacion": {
        "vinculacionId": -1
      },
      "personales": {
        "Tipo_Identificacion": -1,
        "identificacion": "",
        "primer_nombre": "",
        "segundo_apellido": "",
        "primer_apellido": "",
        "segundo_nombre": "",
        "apodo": "",
        "nacionalidad": -1,
        "sexo": -1,
        "estado_civil": -1,
        "ocupacion": -1
      },
      "recinto": {
        "recintoId": -1
      },
      "despachoId": 0,
      "fechaInicio": "2023-02-06",
      "fechaFin": "2023-02-06"
    }
  }

  private searchByUserIdentification(userIdentification: string) {
    return {
      "usuarioId": 13139,
      "busquedaCodigo": 5,
      "EsCantidad": false,
      "fechaInicioVacia": true,
      "fechaFinVacia": true,
      "Pagina": 1,
      "CantidadPorPagina": 10,
      "denuncia": {
        "numero": "",
        "tanda": -1,
        "tipo_origen": -1,
        "fuente": -1,
        "estado": -1,
        "prioridad": -1,
        "registrado_por": ""
      },
      "ubicacion_hecho": {
        "provincia": -1,
        "municipio": -1,
        "distrito": -1,
        "ciudad": -1,
        "sector": -1,
        "calle": ""
      },
      "vinculacion": {
        "vinculacionId": -1
      },
      "personales": {
        "Tipo_Identificacion": 1,
        "identificacion": userIdentification,
        "primer_nombre": "",
        "segundo_apellido": "",
        "primer_apellido": "",
        "segundo_nombre": "",
        "apodo": "",
        "nacionalidad": -1,
        "sexo": -1,
        "estado_civil": -1,
        "ocupacion": -1
      },
      "recinto": {
        "recintoId": -1
      },
      "despachoId": 0,
      "fechaInicio": "2023-02-06",
      "fechaFin": "2023-02-06"
    }
  }

  private async loginSicemp() {
    try {
      const response = await axios.post("https://apisicempdemo.pgr.gob.do/api/v1/usuarios/login", {
        "username": this.config.get('SICEMP_USER'),
        "password":  this.config.get('SICEMP_PASSWORD')
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return response.data.user.data.token;
    } catch (error) {
      console.log(error);
      return "";
    }
  }

  private async createSicempCase(_case: Case) {
    const body = this.buildSicempCase(_case);
    try {
      const token = await this.loginSicemp();
      await axios.post("https://apisicempdemo.pgr.gob.do/api/v1/casos", body, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(JSON.stringify(body));
      console.log(error.response.data);

    }
  }

  private buildSicempCase(_case: Case) {
    return {
      "denuncia": {
        "generales": {
          "caso_id": 0,
          "caso_codigo": 0,
          "caso_numero": _case.code,
          "caso_numero_unico": "",
          "tipo_orden": 1,
          "sub_fuente": -1,
          "fuente": 1,
          "prioridad": 1,
          "casoPrivacidadId": 2,
          "estado": 1,
          "caso_fecha_creacion": _case.createdAt,
          "caso_fecha": _case.createdAt,
          "proceso_etapa_id": 1,
          "recinto_id": 13,
          "recinto_id_origen": 1,
          "despacho_id": 5780,
          "despacho_id_origen": 1,
          "caso_numero_despacho": "",
          "expediente_codigo": 1
        },
        "hecho": {
          "fecha": "",
          "hecho_id": 0,
          "relato": _case.description,
          "hora": ""
        },
        "lugar_hecho": {
          "direccion_id": 0,
          "provincia": -1,
          "municipio": -1,
          "ciudad": -1,
          "distrito": -1,
          "sector": -1,
          "calle": "",
          "numero": "",
          "puntos_referencias": "",
          "latitud": "",
          "longitud": ""
        },
        "infracciones": [
        ]
      },
      "denunciante": {
        "generales": {
          "tipo_persona": {
            "id": 1,
            "descripcion": "Denunciante"
          },
          "empresa": "",
          "empresa_rnc": "",
          "tipo_documento": 1,
          "documento": _case.victim.id,
          "sexo": _case.victim.genre,
          "primer_nombre": "",
          "segundo_nombre": "",
          "primer_apellido": "",
          "segundo_apellido": "",
          "nombre_completo": _case.victim.name,
          "apodo": _case.victim.otherName,
          "nacionalidad": 145,
          "estado_civil": _case.victim.maritalStatus,
          "numero_hijos": _case.victim.children,
          "ocupacion": -1,
          "religion": -1,
          "despachoId": -1,
          "fechaNacimiento": _case.victim.birthday,
          "personaLee": false,
          "personaEscribe": false,
          "personaAlias": "",
          "edad": _case.victim.age.toString(),
          "tipoEdad": 1,
          "referencia": "",
          "poblacion": 3
        },
        "contactos": {
          "contacto_id": 0,
          "correo_electronico": _case.victim.email,
          "facebook": "",
          "twitter": "",
          "google": "",
          "youtube": "",
          "instagram": "",
          "otro1": _case.victim.phoneNumber,
          "otro2": ""
        },
        "direccion": {
          "direccion_id": 0,
          "provincia": -1,
          "municipio": -1,
          "ciudad": -1,
          "distrito": -1,
          "sector": -1,
          "calle": _case.victim.originAddress,
          "numero": "",
          "puntos_referencias": "",
          "latitud": "",
          "longitud": ""
        },
        "telefonos": [
          {
            "telefono_id": 0,
            "numero": _case.victim.phoneNumber,
            "activo": true,
            "persona_id": 0,
            "Tipo_id": 0
          },
        ]
      },
      "institucion": {
        "rnc": "",
        "institucion": ""
      }
    }
  }
}
