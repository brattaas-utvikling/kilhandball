
function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <div className="border-b-2 border-gray-600 pb-4">
            <h1 className="text-3xl font-heading font-bold mb-4 text-center">Velkommen til KIL Håndball</h1>
            <p className="text-base font-body font-normal">Vi holder på å fornye nettsiden vår. Det vil komme oppdatert informasjon løpende.</p>
        </div>
        <div className="p-6 md:p-8 max-w-2xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold font-heading text-kilsvart mb-4">
                Innkalling til årsmøte i Kongsvinger IL Håndball 27. MARS 2025
            </h2>
            <p className="mb-4 text-lg font-body font-normal">
                Styret innkaller herved til årsmøte i Kongsvinger IL Håndball. 
                Årsmøtet avholdes <strong>27. mars kl. 18.00</strong> i peisestua på Gjemselund.
            </p>
            <p className="mb-4 text-lg font-body font-normal">
                Saker som et medlem ønsker behandlet på årsmøtet, må sendes styret senest 
                <strong>13. mars 2025</strong> til <a href="mailto:post@kilhandball.no" className="text-kilred font-semibold hover:underline">post@kilhandball.no</a>.
            </p>
            <p className="mb-4 text-lg font-body font-normal">
                Fullstendig sakliste med alle saksdokumenter vil bli gjort tilgjengelig for medlemmene 
                senest én uke før årsmøtet på 
                <a href="https://www.kilhandball.no" className="text-kilred font-semibold hover:underline"> www.kilhandball.no</a>.
            </p>
            <p className="mb-4 text-lg font-body font-normal">
                For å ha stemmerett og kunne velges til verv må man ha vært medlem av 
                Kongsvinger IL Håndball i minst én måned, fylle minst 15 år i det kalenderåret årsmøtet 
                avholdes, og ha gjort opp sine økonomiske forpliktelser til klubben. 
                Alle medlemmer har uansett møterett, talerett og forslagsrett.
            </p>
            <p className="mb-4 text-lg font-body font-normal">
                For mer informasjon om årsmøte samt regler om stemmerett, valgbarhet, forslagsrett mv., 
                se Kongsvinger IL Håndballs lov.
            </p>
            <p className="mb-4 text-lg font-body font-normal">
                Ved spørsmål som gjelder årsmøtet, send mail til: 
                <a href="mailto:post@kilhandball.no" className="text-kilred font-semibold hover:underline">post@kilhandball.no</a>
            </p>
            <p className="mt-6 font-semibold text-lg font-body">Velkommen til årsmøte!</p>
            <p className="font-medium text-lg font-body">Med vennlig hilsen</p>
            <p className="font-semibold text-lg font-body">Styret</p>
        </div>

        </div>
    )
}

export default Home;