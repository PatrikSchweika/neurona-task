using Microsoft.EntityFrameworkCore;

using NeuronaTask.Server.Data;
using NeuronaTask.Server.GraphQL.Exceptions;
using NeuronaTask.Server.GraphQL.Models;
using NeuronaTask.Server.GraphQL.Models.Mappings;

namespace NeuronaTask.Server.GraphQL;

public class Query
{
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<PatientListItem> GetPatients(AppDbContext context)
    {
        return context.Patients
            .Select(patient => patient.ToListItem())
            .AsQueryable();
    }

    public async Task<PatientDetail> GetPatient(int patientId, AppDbContext context)
    {
        var patient = await context.Patients
            .Include(patient => patient.Diagnoses)
            .FirstOrDefaultAsync(p => p.Id == patientId);

        if (patient == null)
        {
            throw new PatientNotFoundException(patientId);
        }

        return patient.ToDetail();
    }
}