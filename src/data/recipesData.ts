export interface Recipe {
  id: string;
  title: string;
  image: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  difficulty: 'Einfach' | 'Mittel' | 'Schwer';
  category: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  tips?: string[];
}

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Klassischer Schokoladenkuchen',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    prepTime: '30 Min',
    cookTime: '45 Min',
    servings: '12 Personen',
    difficulty: 'Mittel',
    category: 'Kuchen',
    description: 'Ein saftiger Schokoladenkuchen, der auf jeder Feier ein Highlight ist.',
    ingredients: [
      '200g Butter (zimmerwarm)',
      '250g Zucker',
      '4 Eier',
      '200g Zartbitterschokolade',
      '250g Mehl',
      '2 TL Backpulver',
      '1 Prise Salz',
      '150ml Milch',
      '2 EL Kakaopulver',
      '1 TL Vanilleextrakt'
    ],
    instructions: [
      'Backofen auf 180°C Ober-/Unterhitze vorheizen. Eine runde Backform (26cm) einfetten und mit Backpapier auslegen.',
      'Schokolade im Wasserbad schmelzen und leicht abkühlen lassen.',
      'Butter und Zucker mit dem Mixer schaumig schlagen. Eier nacheinander unterrühren.',
      'Geschmolzene Schokolade und Vanilleextrakt unterrühren.',
      'Mehl, Backpulver, Kakao und Salz mischen. Abwechselnd mit der Milch unter den Teig rühren.',
      'Teig in die Form füllen und glatt streichen.',
      'Im vorgeheizten Ofen ca. 45 Minuten backen. Stäbchenprobe machen.',
      'Kuchen in der Form 10 Minuten abkühlen lassen, dann auf ein Kuchengitter stürzen.',
      'Vollständig auskühlen lassen bevor er dekoriert wird.'
    ],
    tips: [
      'Für extra saftigen Kuchen den fertigen Kuchen mit Zuckersirup tränken.',
      'Der Kuchen lässt sich gut vorbereiten und sogar einfrieren.'
    ]
  },
  {
    id: '2',
    title: 'Buttercreme Frosting',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=800',
    prepTime: '15 Min',
    cookTime: '0 Min',
    servings: 'Für 1 Torte',
    difficulty: 'Einfach',
    category: 'Cremes & Frostings',
    description: 'Die perfekte Buttercreme für alle Torten und Cupcakes.',
    ingredients: [
      '250g Butter (zimmerwarm)',
      '500g Puderzucker',
      '2-3 EL Milch',
      '1 TL Vanilleextrakt',
      'Lebensmittelfarbe (optional)',
      '1 Prise Salz'
    ],
    instructions: [
      'Butter in eine Schüssel geben und mit dem Mixer auf höchster Stufe 3-5 Minuten schaumig schlagen.',
      'Puderzucker sieben und portionsweise zur Butter geben. Nach jeder Zugabe gut verrühren.',
      'Vanilleextrakt und Salz hinzufügen.',
      'Milch löffelweise zugeben bis die gewünschte Konsistenz erreicht ist.',
      'Buttercreme weitere 3-5 Minuten auf höchster Stufe schlagen bis sie luftig und hell ist.',
      'Falls gewünscht, Lebensmittelfarbe einrühren.',
      'Die Buttercreme ist sofort verwendbar oder kann abgedeckt im Kühlschrank bis zu 1 Woche aufbewahrt werden.'
    ],
    tips: [
      'Für Schokoladen-Buttercreme 50g geschmolzene und abgekühlte Schokolade unterrühren.',
      'Die Butter sollte wirklich zimmerwarm sein, sonst wird die Creme nicht luftig.',
      'Vor dem Gebrauch gekühlt aufbewahrte Buttercreme wieder auf Zimmertemperatur bringen.'
    ]
  },
  {
    id: '3',
    title: 'Knusprige Chocolate Chip Cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
    prepTime: '20 Min',
    cookTime: '12 Min',
    servings: '24 Cookies',
    difficulty: 'Einfach',
    category: 'Cookies',
    description: 'Außen knusprig, innen weich – der perfekte Cookie!',
    ingredients: [
      '200g Butter (zimmerwarm)',
      '150g brauner Zucker',
      '100g weißer Zucker',
      '2 Eier',
      '1 TL Vanilleextrakt',
      '280g Mehl',
      '1 TL Backpulver',
      '1 TL Natron',
      '1 TL Salz',
      '300g Schokodrops',
      '100g gehackte Nüsse (optional)'
    ],
    instructions: [
      'Backofen auf 180°C Ober-/Unterhitze vorheizen. Backblech mit Backpapier auslegen.',
      'Butter mit beiden Zuckersorten schaumig schlagen.',
      'Eier und Vanilleextrakt unterrühren.',
      'Mehl, Backpulver, Natron und Salz mischen. Zur Butter-Zucker-Masse geben und unterrühren.',
      'Schokodrops und ggf. Nüsse unterheben.',
      'Mit einem Eisportionierer oder 2 Löffeln Teigportionen auf das Backblech setzen. Ausreichend Abstand lassen.',
      'Im vorgeheizten Ofen 10-12 Minuten backen bis die Ränder goldbraun sind.',
      'Cookies auf dem Blech 5 Minuten abkühlen lassen, dann auf ein Kuchengitter legen.',
      'Vollständig auskühlen lassen oder lauwarm genießen.'
    ],
    tips: [
      'Für weichere Cookies die Backzeit um 1-2 Minuten reduzieren.',
      'Der Teig kann problemlos 2-3 Tage im Kühlschrank aufbewahrt werden.'
    ]
  },
  {
    id: '4',
    title: 'Rote-Samt Torte (Red Velvet)',
    image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=800',
    prepTime: '40 Min',
    cookTime: '30 Min',
    servings: '12 Personen',
    difficulty: 'Schwer',
    category: 'Kuchen',
    description: 'Die klassische amerikanische Red Velvet Torte mit Frischkäse-Frosting.',
    ingredients: [
      '280g Mehl',
      '250g Zucker',
      '2 EL Kakaopulver',
      '1 TL Backpulver',
      '1 TL Natron',
      '1 TL Salz',
      '2 Eier',
      '250ml Buttermilch',
      '120ml Pflanzenöl',
      '2 EL rote Lebensmittelfarbe',
      '1 TL Vanilleextrakt',
      '1 TL Essig'
    ],
    instructions: [
      'Backofen auf 175°C vorheizen. Zwei runde Backformen (je 20cm) einfetten und mit Backpapier auslegen.',
      'Mehl, Zucker, Kakao, Backpulver, Natron und Salz in einer großen Schüssel vermischen.',
      'In einer separaten Schüssel Eier, Buttermilch, Öl, Lebensmittelfarbe und Vanille verquirlen.',
      'Die flüssigen Zutaten zu den trockenen geben und mit einem Mixer verrühren.',
      'Essig unterheben (der Teig wird etwas aufschäumen).',
      'Teig gleichmäßig auf beide Formen verteilen.',
      'Ca. 30 Minuten backen. Stäbchenprobe machen.',
      'Kuchen 10 Minuten in der Form abkühlen lassen, dann stürzen und vollständig auskühlen lassen.',
      'Mit Frischkäse-Frosting füllen und überziehen.'
    ],
    tips: [
      'Verwende hochwertige Lebensmittelfarbe für die intensive rote Farbe.',
      'Die Torte schmeckt am besten, wenn sie über Nacht im Kühlschrank durchziehen kann.'
    ]
  },
  {
    id: '5',
    title: 'Zitronen-Baiser-Torte',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800',
    prepTime: '45 Min',
    cookTime: '35 Min',
    servings: '10 Personen',
    difficulty: 'Schwer',
    category: 'Kuchen',
    description: 'Fruchtig-süße Zitronentorte mit luftigem Baiser-Topping.',
    ingredients: [
      '200g Mehl',
      '100g Butter',
      '50g Zucker',
      '1 Ei',
      'Für die Füllung:',
      '4 Zitronen (Saft und Schale)',
      '200g Zucker',
      '4 Eier',
      '100g Butter',
      'Für das Baiser:',
      '4 Eiweiß',
      '200g Zucker'
    ],
    instructions: [
      'Für den Mürbteig Mehl, Butter, Zucker und Ei zu einem Teig verkneten. 30 Min kühlen.',
      'Backofen auf 180°C vorheizen. Teig ausrollen und in eine Tarteform (26cm) geben.',
      'Boden mehrfach mit einer Gabel einstechen. 15 Min vorbacken.',
      'Für die Zitronencreme: Zitronensaft, -schale, Zucker und Eier in einem Topf verrühren.',
      'Unter ständigem Rühren erhitzen bis die Masse eindickt (nicht kochen!).',
      'Vom Herd nehmen und Butter unterrühren. Durch ein Sieb streichen.',
      'Zitronencreme auf den vorgebackenen Boden geben.',
      'Für das Baiser Eiweiß steif schlagen, Zucker einrieseln lassen.',
      'Baiser auf die Zitronencreme spritzen oder streichen.',
      'Bei 180°C ca. 15 Min backen bis das Baiser goldbraun ist.'
    ],
    tips: [
      'Die Zitronencreme kann auch am Vortag zubereitet werden.',
      'Für schönes Baiser die Spitzen mit einem Brenner karamellisieren.'
    ]
  },
  {
    id: '6',
    title: 'Vanille Cupcakes',
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800',
    prepTime: '25 Min',
    cookTime: '20 Min',
    servings: '12 Cupcakes',
    difficulty: 'Einfach',
    category: 'Cupcakes',
    description: 'Lockere Vanille Cupcakes, perfekt für jede Gelegenheit.',
    ingredients: [
      '150g Butter (zimmerwarm)',
      '150g Zucker',
      '3 Eier',
      '200g Mehl',
      '2 TL Backpulver',
      '1 Prise Salz',
      '80ml Milch',
      '2 TL Vanilleextrakt',
      'Vanillemark aus 1 Schote'
    ],
    instructions: [
      'Backofen auf 175°C vorheizen. Muffinform mit Papierförmchen auslegen.',
      'Butter und Zucker schaumig schlagen.',
      'Eier einzeln unterrühren. Vanilleextrakt und Vanillemark dazugeben.',
      'Mehl, Backpulver und Salz mischen.',
      'Mehlmischung abwechselnd mit der Milch unter den Teig rühren.',
      'Teig gleichmäßig auf die Förmchen verteilen (etwa 2/3 voll).',
      'Ca. 18-20 Minuten backen bis die Oberfläche goldbraun ist.',
      'Vollständig auskühlen lassen bevor sie dekoriert werden.'
    ],
    tips: [
      'Für Schoko-Cupcakes 30g Kakao zugeben und die Mehlmenge entsprechend reduzieren.',
      'Die Cupcakes halten sich in einer Dose 3-4 Tage frisch.'
    ]
  },
  {
    id: '7',
    title: 'Macadamia-Cookies',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800',
    prepTime: '20 Min',
    cookTime: '14 Min',
    servings: '20 Cookies',
    difficulty: 'Einfach',
    category: 'Cookies',
    description: 'Butterige Cookies mit weißer Schokolade und Macadamia-Nüssen.',
    ingredients: [
      '150g Butter',
      '120g brauner Zucker',
      '80g weißer Zucker',
      '1 Ei',
      '1 TL Vanilleextrakt',
      '220g Mehl',
      '1/2 TL Backpulver',
      '1/2 TL Natron',
      '1/2 TL Salz',
      '150g weiße Schokodrops',
      '100g Macadamia-Nüsse (gehackt)'
    ],
    instructions: [
      'Backofen auf 175°C vorheizen. Backblech mit Backpapier auslegen.',
      'Butter mit beiden Zuckersorten cremig rühren.',
      'Ei und Vanille unterrühren.',
      'Mehl, Backpulver, Natron und Salz vermischen und unterheben.',
      'Schokodrops und Macadamias einarbeiten.',
      'Teig portionsweise auf das Blech setzen, dabei Abstand lassen.',
      'Ca. 12-14 Minuten backen bis die Ränder leicht gebräunt sind.',
      'Auf dem Blech abkühlen lassen.'
    ],
    tips: [
      'Macadamias können durch Cashews ersetzt werden.',
      'Für extra Geschmack die Nüsse vorher kurz anrösten.'
    ]
  },
  {
    id: '8',
    title: 'Frischkäse-Frosting',
    image: 'https://images.unsplash.com/photo-1557925923-33b27c4930d1?w=800',
    prepTime: '10 Min',
    cookTime: '0 Min',
    servings: 'Für 1 Torte',
    difficulty: 'Einfach',
    category: 'Cremes & Frostings',
    description: 'Cremiges Frosting mit Frischkäse, perfekt für Red Velvet und Karottenkuchen.',
    ingredients: [
      '200g Frischkäse (zimmerwarm)',
      '100g Butter (zimmerwarm)',
      '300g Puderzucker',
      '1 TL Vanilleextrakt',
      '1 Prise Salz'
    ],
    instructions: [
      'Frischkäse und Butter in einer Schüssel cremig rühren.',
      'Puderzucker sieben und nach und nach einrühren.',
      'Vanilleextrakt und Salz hinzufügen.',
      'Alles für 3-4 Minuten auf höchster Stufe schlagen bis das Frosting luftig ist.',
      'Sofort verwenden oder abgedeckt im Kühlschrank bis zu 3 Tage aufbewahren.',
      'Vor Gebrauch wieder auf Zimmertemperatur bringen und kurz aufschlagen.'
    ],
    tips: [
      'Frischkäse und Butter müssen wirklich zimmerwarm sein.',
      'Nicht zu lange schlagen, sonst wird das Frosting flüssig.'
    ]
  }
];
