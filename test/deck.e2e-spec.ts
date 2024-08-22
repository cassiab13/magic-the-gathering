import { Test, TestingModule } from '@nestjs/testing';
import { DeckService } from '../src/deck/deck.service';
import CommonRequest from '../src/common/request';
import { ChooseCommanderHandler } from '../src/deck/handlers/chooseCommander.handler';
import { FilterCardsByColorHandler } from '../src/deck/handlers/filterCardsByColor.handler';
import { SaveDeckHandler } from '../src/deck/handlers/saveDeck.handler';
import { Deck, DeckSchema } from '../src/deck/schema/deck.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

describe('DeckService (e2e)', () => {
  let deckService: DeckService;
  let chooseCommanderHandler: ChooseCommanderHandler;
  let filterCardsByColorHandler: FilterCardsByColorHandler;
  let saveDeckHandler: SaveDeckHandler;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(), 
        MongooseModule.forRoot(`mongodb://0.0.0.0:27017/magic-the-gatering-TEST`), 
        MongooseModule.forFeature([{ name: Deck.name, schema: DeckSchema }]),
      ],
      providers: [
        DeckService,
        ChooseCommanderHandler,
        FilterCardsByColorHandler,
        SaveDeckHandler,
        {
          provide: CommonRequest,
          useValue: {}
        },
      ],
    }).compile();

    deckService = module.get<DeckService>(DeckService);
    chooseCommanderHandler = module.get<ChooseCommanderHandler>(ChooseCommanderHandler);
    filterCardsByColorHandler = module.get<FilterCardsByColorHandler>(FilterCardsByColorHandler);
    saveDeckHandler = module.get<SaveDeckHandler>(SaveDeckHandler);

    jest.spyOn(chooseCommanderHandler, 'handle').mockImplementation(async (deck: Deck) => {
      deck.commander = { 
        name: 'Mock Commander',
        colorIdentity: ['U'],
        supertypes: ['Legendary'],
      };
      return await filterCardsByColorHandler.handle(deck);
    });

    jest.spyOn(filterCardsByColorHandler, 'handle').mockImplementation(async (deck: Deck) => {
      deck.cards = [{
        name: 'Card Mock',
        colorIdentity: ['U'],
        type: ['Land'],
        supertypes: ['Basic'],
      }];
      return await saveDeckHandler.handle(deck);
    });
    
    jest.spyOn(saveDeckHandler, 'handle').mockImplementation(async (deck: Deck) => {
      return;
    });
  });
  

  afterAll(async () => {
    await module.get('DatabaseConnection').close();
  });

  it('should create a deck with a commander and filtered cards', async () => {
    await deckService.createDeck();

    expect(chooseCommanderHandler.handle).toHaveBeenCalled();
    expect(filterCardsByColorHandler.handle).toHaveBeenCalled();
    expect(saveDeckHandler.handle).toHaveBeenCalled();
  });
});
