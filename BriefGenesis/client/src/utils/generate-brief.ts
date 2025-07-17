export interface Project {
  name: string;
  area: string;
  type: string;
  audience: string;
  problem: string;
  objective: string;
  features: string[];
  duration: string;
  context: string;
  constraints: string[];
  deliverables: string[];
  inspiration: string[];
}

export const projectTypes = [
  { id: 'mobile', label: 'App Mobile', description: 'Aplicativo para smartphones' },
  { id: 'web', label: 'Dashboard Web', description: 'Interface web administrativo' },
  { id: 'platform', label: 'Plataforma Web', description: 'Sistema web completo' },
  { id: 'desktop', label: 'Sistema Desktop', description: 'Aplicação para computador' },
  { id: 'tablet', label: 'Interface Tablet', description: 'Interface otimizada para tablets' },
  { id: 'watch', label: 'App Smartwatch', description: 'Aplicativo para relógio inteligente' },
  { id: 'tv', label: 'Interface TV', description: 'Interface para Smart TV' },
  { id: 'kiosk', label: 'Kiosk Interativo', description: 'Interface para totens' }
];

const projectData = {
  names: [
    'NutriMais', 'EcoVida', 'FinanceFlow', 'StudyBuddy', 'PetCare', 
    'TravelEasy', 'FitTracker', 'MoodJournal', 'TaskMaster', 'SocialConnect',
    'ShopSmart', 'HealthHub', 'LearnPath', 'WorkSpace', 'FoodieApp',
    'MediCare', 'SmartHome', 'BookClub', 'EventPlanner', 'CryptoWallet',
    'GreenEnergy', 'ArtStudio', 'CodeMentor', 'MusicFlow', 'RecipeBox'
  ],
  areas: [
    'Saúde e Bem-estar', 'Educação', 'Fintech', 'E-commerce', 'Sustentabilidade',
    'Agronegócio', 'Entretenimento', 'Produtividade', 'Viagens', 'Tecnologia',
    'Alimentação', 'Esportes', 'Arte e Cultura', 'Mobilidade', 'Networking',
    'Imobiliário', 'Medicina', 'Gaming', 'Streaming', 'Logística'
  ],
  types: {
    mobile: ['App mobile iOS', 'App mobile Android', 'App mobile híbrido'],
    web: ['Dashboard administrativo', 'Painel de controle', 'Interface de gerenciamento'],
    platform: ['Plataforma web', 'Portal completo', 'Sistema web integrado'],
    desktop: ['Sistema desktop Windows', 'Aplicação Mac', 'Software multiplataforma'],
    tablet: ['Interface para iPad', 'App Android tablet', 'Interface touch'],
    watch: ['Apple Watch app', 'Wear OS app', 'Interface wearable'],
    tv: ['Smart TV interface', 'Apple TV app', 'Android TV interface'],
    kiosk: ['Totem interativo', 'Quiosque digital', 'Interface pública']
  },
  audiences: [
    'Jovens de 18 a 25 anos, estudantes universitários',
    'Profissionais de 25 a 40 anos, classe média',
    'Idosos de 60+ anos, aposentados',
    'Pais de família, 30 a 45 anos',
    'Adolescentes de 13 a 18 anos',
    'Empreendedores e freelancers',
    'Profissionais da saúde',
    'Educadores e professores',
    'Atletas e entusiastas do fitness',
    'Artistas e criativos',
    'Desenvolvedores e programadores',
    'Executivos e gestores',
    'Estudantes do ensino médio',
    'Aposentados ativos, 55 a 70 anos'
  ],
  problems: [
    'Dificuldade em organizar rotinas diárias',
    'Falta de controle financeiro pessoal',
    'Ausência de acompanhamento médico regular',
    'Dificuldades no aprendizado à distância',
    'Falta de conectividade social pós-pandemia',
    'Gestão ineficiente de projetos',
    'Desperdício de alimentos em casa',
    'Sedentarismo e falta de exercícios',
    'Dificuldade em encontrar eventos culturais locais',
    'Falta de transparência em investimentos',
    'Problemas de comunicação em equipes remotas',
    'Dificuldade em manter hábitos saudáveis',
    'Falta de acesso a mentoria profissional',
    'Desorganização de documentos pessoais'
  ],
  objectives: [
    'Melhorar a qualidade de vida dos usuários',
    'Facilitar o acesso à informação relevante',
    'Promover hábitos saudáveis',
    'Aumentar a produtividade no trabalho',
    'Conectar pessoas com interesses similares',
    'Simplificar processos burocráticos',
    'Reduzir o impacto ambiental',
    'Democratizar o acesso à educação',
    'Otimizar o tempo dos usuários',
    'Aumentar a segurança financeira',
    'Promover o bem-estar mental',
    'Facilitar o networking profissional',
    'Melhorar a experiência de compra',
    'Incentivar a criatividade'
  ],
  features: [
    ['Cadastro de usuário', 'Dashboard personalizado', 'Notificações push', 'Sistema de metas'],
    ['Login social', 'Chat em tempo real', 'Calendário integrado', 'Relatórios analíticos'],
    ['Modo offline', 'Sincronização na nuvem', 'Interface dark/light', 'Tutorial interativo'],
    ['Gamificação', 'Sistema de pontos', 'Compartilhamento social', 'Backup automático'],
    ['Pesquisa avançada', 'Filtros customizáveis', 'Exportação de dados', 'Suporte multilíngue'],
    ['Integração com APIs', 'Sistema de favoritos', 'Histórico de atividades', 'Configurações avançadas'],
    ['Reconhecimento de voz', 'Scanner QR/código de barras', 'Geolocalização', 'Camera integrada'],
    ['Sistema de tags', 'Lembretes inteligentes', 'Análise de comportamento', 'Suporte ao cliente'],
    ['Modo colaborativo', 'Versionamento', 'Templates personalizáveis', 'Métricas de performance']
  ],
  durations: ['3 dias', '5 dias', '1 semana', '10 dias', '2 semanas', '3 semanas'],
  contexts: [
    'Durante a pandemia, houve um aumento significativo na demanda por soluções digitais',
    'Com o crescimento do trabalho remoto, surge a necessidade de ferramentas colaborativas',
    'O mercado brasileiro ainda carece de soluções acessíveis para esse público',
    'Pesquisas mostram que 68% dos usuários abandonam apps por interface confusa',
    'A nova lei de proteção de dados exige maior transparência no tratamento de informações',
    'Startups do setor têm levantado milhões em investimento nos últimos anos',
    'A inclusão digital tem sido prioridade em políticas públicas recentes'
  ],
  constraints: [
    ['Orçamento limitado de R$ 50.000', 'Prazo reduzido', 'Equipe enxuta'],
    ['Compliance com LGPD', 'Acessibilidade WCAG 2.1', 'Suporte a navegadores antigos'],
    ['Funcionar offline', 'Baixo consumo de dados', 'Performance em dispositivos básicos'],
    ['Integração com sistemas legados', 'Backup automático', 'Alta disponibilidade'],
    ['Multilíngue (PT/EN/ES)', 'Fuso horário múltiplo', 'Moedas diferentes'],
    ['Design system estabelecido', 'Marca já consolidada', 'Guidelines rigorosos']
  ],
  deliverables: [
    ['Wireframes de baixa fidelidade', 'User journey map', 'Arquitetura da informação'],
    ['Protótipo interativo', 'Design system', 'Guia de estilo'],
    ['Telas principais (5-8)', 'Estados de erro', 'Loading states'],
    ['Versão mobile e desktop', 'Casos de uso extremos', 'Documentação'],
    ['Apresentação executiva', 'Especificações técnicas', 'Plano de testes'],
    ['Persona detalhada', 'Mapa de empatia', 'Pesquisa de concorrentes']
  ],
  inspirations: [
    ['Spotify', 'Netflix', 'Airbnb'],
    ['Slack', 'Discord', 'Zoom'],
    ['Instagram', 'TikTok', 'Pinterest'],
    ['Nubank', 'Inter', 'C6 Bank'],
    ['Uber', 'iFood', '99'],
    ['Notion', 'Figma', 'Linear']
  ]
};

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateProject(selectedType?: string): Project {
  const typeKey = selectedType || getRandomItem(Object.keys(projectData.types));
  const typeOptions = projectData.types[typeKey as keyof typeof projectData.types];
  
  return {
    name: getRandomItem(projectData.names),
    area: getRandomItem(projectData.areas),
    type: getRandomItem(typeOptions),
    audience: getRandomItem(projectData.audiences),
    problem: getRandomItem(projectData.problems),
    objective: getRandomItem(projectData.objectives),
    features: getRandomItem(projectData.features),
    duration: getRandomItem(projectData.durations),
    context: getRandomItem(projectData.contexts),
    constraints: getRandomItem(projectData.constraints),
    deliverables: getRandomItem(projectData.deliverables),
    inspiration: getRandomItem(projectData.inspirations)
  };
}
