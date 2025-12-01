using Microsoft.EntityFrameworkCore;

using NeuronaTask.Server.Data;
using NeuronaTask.Server.Data.Entities;
using NeuronaTask.Server.GraphQL.Exceptions;
using NeuronaTask.Server.GraphQL.Models;
using NeuronaTask.Server.GraphQL.Models.Mappings;

namespace NeuronaTask.Server.GraphQL;

public class Mutation
{
    public async Task<PatientListItem> AddPatient(
        string name,
        int age,
        AppDbContext context)
    {
        var patient = new PatientDb
        {
            Id = 0,
            Name = name,
            Age = age,
            Diagnoses = []
        };

        var result = context.Patients.Add(patient);
        await context.SaveChangesAsync();

        return result.Entity.ToListItem();
    }

    public async Task UpdateDiagnoses(
        int patientId,
        List<DiagnosisUpdate> diagnoses,
        AppDbContext context
        )
    {
        var patient = await context.Patients
            .Include(p => p.Diagnoses)
            .AsTracking()
            .FirstOrDefaultAsync(p => p.Id == patientId);

        if (patient == null)
        {
            throw new PatientNotFoundException(patientId);
        }

        var diagnosesToAdd = diagnoses.Where(diagnosis => !diagnosis.Id.HasValue);
        var diagnosesToUpdate = diagnoses.Where(diagnosis => diagnosis.Id.HasValue && patient.Diagnoses.Any(d => d.Id == diagnosis.Id.Value));
        var diagnosesToRemove = patient.Diagnoses.Where(diagnosis => diagnosesToUpdate.All(diagnosisUpdate => diagnosisUpdate.Id != diagnosis.Id));

        foreach (var diagnosis in diagnosesToRemove)
        {
            patient.Diagnoses.Remove(diagnosis);
        }

        foreach (var diagnosis in diagnosesToAdd)
        {
            var newDiagnosis = new DiagnosisDb
            {
                Id = 0,
                Date = diagnosis.Date,
                Description = diagnosis.Description,
                ImageUrl = diagnosis.ImageUrl,
                PatientId = patientId
            };

            patient.Diagnoses.Add(newDiagnosis);
        }

        foreach (var diagnosis in diagnosesToUpdate)
        {
            var patientDiagnosis = patient.Diagnoses.Single(d => d.Id == diagnosis.Id!.Value);

            patientDiagnosis.Date = diagnosis.Date;
            patientDiagnosis.Description = diagnosis.Description;
            patientDiagnosis.ImageUrl = diagnosis.ImageUrl;
        }

        await context.SaveChangesAsync();
    }
}