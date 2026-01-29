import fastify from "fastify";

const app = fastify();

let teams = [
    {id: 1, name: 'Botafogo de Futebol e Regatas', city: 'Rio de Janeiro', country: 'Brasil'},
    {id: 2, name: 'Futbol Club Barcelona', city: 'Barcelona', country: 'Espanha'},
    {id: 3, name: 'Liverpool Football Club', city: 'Liverpool', country: 'Reino Unido'},
    {id: 4, name: 'Tottenham Hotspur Football Club', city: 'Londres', country: 'Reino Unido'}
];

app.get('/teams', async (request, reply) => {
    return teams; 
});

app.get('/teams/:id', async (request, reply) => {
    const { id } = request.params;
    const team = teams.find(t => t.id == id);

    if (team) {
        return team;
    } else {
        reply.status(404).send({ message: 'Team not found' });
    }
});

app.post('/teams', async (request, reply) => {
    const { name, city, country } = request.body; 
    if (!name || !city || !country) {
        return reply.status(400).send({ message: 'Name, city and country are required' });
    }
    const newTeam = {
        id: teams.length + 1,  
        name,
        city,
        country
    };
    teams.push(newTeam);

    return reply.status(201).send(newTeam);
});

app.put('/teams/:id', async (request, reply) => {
    const { id } = request.params;
    const { name, city, country } = request.body;
    if (!name || !city || !country) {
        return reply.status(400).send({ message: 'Name, city and country are required' });
    }
    const teamIndex = teams.findIndex(t => t.id == id);
    if (teamIndex === -1) {
        return reply.status(404).send({ message: 'Team not found' });
    }
    teams[teamIndex] = { id, name, city, country };

    return reply.status(200).send(teams[teamIndex]);
});

app.patch('/teams/:id', async (request, reply) => {
    const { id } = request.params;
    const { name, city, country } = request.body;
    const team = teams.find(t => t.id == id);

    if (!team) {
        return reply.status(404).send({ message: 'Team not found' });
    }
    if (name) team.name = name;
    if (city) team.city = city;
    if (country) team.country = country;

    return reply.status(200).send(team);
});

app.delete('/teams/:id', async (request, reply) => {
    const { id } = request.params;
    const teamIndex = teams.findIndex(t => t.id == id);
    if (teamIndex === -1) {
        return reply.status(404).send({ message: 'Team not found' });
    }
    const removedTeam = teams.splice(teamIndex, 1);

    return reply.status(200).send({ message: 'Team deleted successfully', team: removedTeam[0] });
});

const start = async () => {
    try {
        await app.listen({ port: 3000 });
        console.log('http://localhost:3000');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();