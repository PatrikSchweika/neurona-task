namespace NeuronaTask.Server.GraphQL.Exceptions;

public class PatientNotFoundException(int patientId) : GraphQLException($"Patient ({patientId}) not found.");