import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialPlayers = [
  {
    name: 'Kylian Mbappé',
    position: 'CF',
    overall: 95,
    nationality: 'France',
    club: 'Paris Saint-Germain',
    age: 25,
    height: '178 cm',
    weight: '73 kg',
    description: 'Lightning-fast striker with exceptional dribbling skills and clinical finishing. Known for his explosive pace and ability to score from any angle.',
  },
  {
    name: 'Erling Haaland',
    position: 'CF',
    overall: 94,
    nationality: 'Norway',
    club: 'Manchester City',
    age: 24,
    height: '194 cm',
    weight: '88 kg',
    description: 'Powerful striker with incredible physical presence. Exceptional at aerial duels and has a deadly finishing ability inside the box.',
  },
  {
    name: 'Kevin De Bruyne',
    position: 'AMF',
    overall: 93,
    nationality: 'Belgium',
    club: 'Manchester City',
    age: 33,
    height: '181 cm',
    weight: '70 kg',
    description: 'Creative playmaker with exceptional vision and passing range. Master of assists and long-range shooting.',
  },
  {
    name: 'Virgil van Dijk',
    position: 'CB',
    overall: 92,
    nationality: 'Netherlands',
    club: 'Liverpool',
    age: 33,
    height: '193 cm',
    weight: '92 kg',
    description: 'Dominant center-back with excellent positioning and aerial ability. Strong leader and composed on the ball.',
  },
  {
    name: 'Mohamed Salah',
    position: 'RWF',
    overall: 91,
    nationality: 'Egypt',
    club: 'Liverpool',
    age: 32,
    height: '175 cm',
    weight: '71 kg',
    description: 'Elite winger with incredible speed and cutting inside ability. Prolific goalscorer with exceptional left foot.',
  },
  {
    name: 'Jude Bellingham',
    position: 'CMF',
    overall: 90,
    nationality: 'England',
    club: 'Real Madrid',
    age: 21,
    height: '186 cm',
    weight: '75 kg',
    description: 'Dynamic midfielder with excellent box-to-box capabilities. Great at both attacking and defensive duties.',
  },
  {
    name: 'Lionel Messi',
    position: 'RWF',
    overall: 92,
    nationality: 'Argentina',
    club: 'Inter Miami',
    age: 37,
    height: '170 cm',
    weight: '72 kg',
    description: 'Legendary playmaker with unmatched dribbling and vision. Master of free-kicks and precise passing.',
  },
  {
    name: 'Robert Lewandowski',
    position: 'CF',
    overall: 91,
    nationality: 'Poland',
    club: 'Barcelona',
    age: 35,
    height: '185 cm',
    weight: '81 kg',
    description: 'Clinical striker with exceptional positioning and finishing. Great at holding up play and linking with teammates.',
  },
  {
    name: 'Manuel Neuer',
    position: 'GK',
    overall: 90,
    nationality: 'Germany',
    club: 'Bayern Munich',
    age: 38,
    height: '193 cm',
    weight: '92 kg',
    description: 'Sweeper-keeper with excellent distribution and shot-stopping. Known for his unique playing style outside the box.',
  },
  {
    name: 'Luka Modrić',
    position: 'CMF',
    overall: 89,
    nationality: 'Croatia',
    club: 'Real Madrid',
    age: 39,
    height: '172 cm',
    weight: '66 kg',
    description: 'Elegant midfielder with exceptional ball control and passing. Master of tempo control and game reading.',
  },
];

async function main() {
  console.log('Seeding database...');
  
  const existingPlayers = await prisma.player.findMany();
  if (existingPlayers.length === 0) {
    for (const player of initialPlayers) {
      await prisma.player.create({
        data: player,
      });
    }
    console.log('Database seeded successfully!');
  } else {
    console.log('Database already has players, skipping seed.');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

