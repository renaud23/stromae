export type WelcomeType = {
	Enq_LibelleEnquete: string;
	Enq_ObjectifsCourts: string;
	Enq_CaractereObligatoire: boolean;
	Enq_QualiteStatistique: boolean;
	Enq_NumeroVisa: string;
	Enq_MinistereTutelle: string;
	Enq_ParutionJo: boolean;
	Enq_DateParutionJo: string;
	Enq_RespOperationnel: string;
	Enq_RespTraitement: string;
	Enq_AnneeVisa: string;
	Loi_statistique: { href: string; target: string };
	Loi_rgpd: { href: string; target: string };
	Loi_informatique: { href: string; target: string };
	whoAnswers: string[];
	Enq_Image?: string;
	Enq_colorTheme?: string;
	Enq_Faq_QuestionsAdditionnelles?: [{ question: string; contenu: string }];
};