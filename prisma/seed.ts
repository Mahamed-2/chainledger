import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing existing data...')
  await prisma.accessLog.deleteMany()
  await prisma.chemicalTreatment.deleteMany()
  await prisma.dyeingProcess.deleteMany()
  await prisma.weavingKnittingProcess.deleteMany()
  await prisma.socialCompliance.deleteMany()
  await prisma.qualityControl.deleteMany()
  await prisma.materialQuality.deleteMany()
  await prisma.circularityMetrics.deleteMany()
  await prisma.certification.deleteMany()
  await prisma.footprint.deleteMany()
  await prisma.process.deleteMany()
  await prisma.material.deleteMany()
  await prisma.supplier.deleteMany()
  await prisma.product.deleteMany()

  console.log('Seeding suppliers (Tier hierarchy)...')
  
  // Tier 1: Assembly
  const factory = await prisma.supplier.create({
    data: {
      name: 'Orta Anadolu',
      tier: 1,
      location: 'Istanbul, Turkey',
      certified: true,
    }
  })

  // Tier 2: Fabric Production
  const mill = await prisma.supplier.create({
    data: {
      name: 'Anadolu Textile Mills',
      tier: 2,
      location: 'Gaziantep, Turkey',
      certified: true,
      parentId: factory.id
    }
  })

  // Tier 4: Raw Material Farm
  const farm = await prisma.supplier.create({
    data: {
      name: 'Izmir Organic Coop',
      tier: 4,
      location: 'Izmir, Turkey',
      certified: true,
      parentId: mill.id
    }
  })

  console.log('Seeding H&M Men\'s Sustainable Outfit...')

  const outfit = await prisma.product.create({
    data: {
      gs1Uri: 'https://dpp.hm.com/01/0725272847561',
      reoId: 'SE-HM-5560427220',
      shaclValidationStatus: 'Valid',
      accessRules: JSON.stringify({
        public: ['name', 'brand', 'materials', 'footprint', 'processes', 'certifications', 'circularity'],
        recycler: ['materials_detailed', 'disassembly_instructions', 'circularity'],
        auditor: ['suppliers_full', 'audit_reports', 'costing', 'shaclValidationStatus', 'qualityControls']
      }),
      eidasAccessLevel: 'low',
      sku: 'HM-MEN-OUTFIT-2026-SE-0012847',
      name: 'H&M Men\'s Sustainable Outfit (T-Shirt, Jeans, Jacket)',
      brand: 'H&M',
      category: 'Men\'s Apparel',
      description: 'A complete sustainable outfit featuring an organic cotton T-shirt, recycled denim jeans, and an rPET jacket. Fully traceable from raw material to retail.',
      
      materials: {
        create: [
          { 
            name: 'Organic Cotton (T-Shirt)', 
            type: 'Fiber', 
            percentage: 35, 
            origin: 'Izmir, Turkey', 
            latitude: 38.42, 
            longitude: 27.14, 
            certified: true, 
            standard: 'GOTS',
            supplierId: farm.id,
            quality: {
              create: {
                fiberLength: 35.0,
                fiberFineness: 4.5,
                tensileStrength: 350.0,
                moistureRegain: 8.5,
                colorGrade: 'High White',
                impurityLevel: 1.2,
                harvestDate: new Date('2025-08-10'),
                batchNumber: 'ORG-COT-2025-08X',
                farmCertification: 'GOTS',
                pesticideFree: true,
                waterSource: 'Rain-fed / Drip Irrigation',
                soilHealthScore: 8,
                carbonSequestration: 1.5
              }
            }
          },
          { 
            name: 'Recycled Cotton Blend (Jeans)', 
            type: 'Fabric', 
            percentage: 45, 
            origin: 'Dhaka, Bangladesh', 
            latitude: 23.81, 
            longitude: 90.41, 
            certified: true, 
            standard: 'RCS' 
          },
          { 
            name: 'Recycled Polyester rPET (Jacket)', 
            type: 'Fabric', 
            percentage: 20, 
            origin: 'Ho Chi Minh, Vietnam', 
            latitude: 10.82, 
            longitude: 106.62, 
            certified: true, 
            standard: 'GRS' 
          }
        ]
      },
      
      processes: {
        create: [
          { 
            stage: 'Raw Material Harvesting (Cotton)', 
            location: 'Izmir, Turkey', 
            latitude: 38.42, 
            longitude: 27.14, 
            timestamp: new Date('2025-08-10'), 
            hash: '0x8f3a2c5e5b6a7d8e9f0a1b2c3d4e5f6a', 
            verified: true,
            supplierId: farm.id,
            socialCompliance: {
              create: {
                factoryName: 'Izmir Organic Coop Farms',
                auditStandard: 'Fair Trade',
                auditDate: new Date('2025-07-20'),
                auditResult: 'approved',
                workerCount: 45,
                femaleWorkerPercentage: 55.0,
                livingWageCompliance: true,
                workingHours: JSON.stringify({ regular: 40, overtime: 0, restDays: 2 }),
                safetyIncidents: 0,
                childLaborFree: true,
                forcedLaborFree: true,
                unionAccess: true,
                grievanceMechanism: true
              }
            }
          },
          { 
            stage: 'Spinning & Knitting (T-Shirt Fabric)', 
            location: 'Gaziantep, Turkey', 
            latitude: 37.06, 
            longitude: 37.38, 
            timestamp: new Date('2025-09-05'), 
            hash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', 
            verified: true,
            supplierId: mill.id,
            weavingProcesses: {
              create: {
                technique: 'knitting',
                machineType: 'circular',
                gauge: 24,
                density: 120.0,
                fabricWeight: 180.0,
                fabricWidth: 150.0,
                shrinkageRate: 3.0,
                pillingResistance: 4,
                abrasionResistance: 4,
                productionSpeed: 25.0,
                defectRate: 0.5
              }
            }
          },
          { 
            stage: 'Dyeing & Finishing', 
            location: 'Gaziantep, Turkey', 
            latitude: 37.06, 
            longitude: 37.38, 
            timestamp: new Date('2025-09-20'), 
            hash: '0xdyeinghash1234567890abcdef', 
            verified: true,
            supplierId: mill.id,
            chemicalTreatments: {
              create: {
                treatmentType: 'dyeing',
                chemicalName: 'Reactive Dye',
                chemicalCAS: '12345-67-8',
                concentration: 2.5,
                applicationMethod: 'exhaust',
                temperature: 60.0,
                duration: 45,
                pHLevel: 7.5,
                zdhcCompliant: true,
                oekoTexCertified: true,
                sideEffects: JSON.stringify([{ effect: 'Low irritation', severity: 'low', affectedPopulation: 'none' }]),
                wastewaterTreatment: 'biological',
                chemicalRecovery: 85.0,
                allergenInfo: 'Hypoallergenic'
              }
            },
            dyeingProcesses: {
              create: {
                dyeType: 'low-impact',
                dyeClass: 'reactive',
                colorFastness: JSON.stringify({ washing: 5, light: 7, rubbing: 4, perspiration: 5 }),
                dyeingMethod: 'batch',
                liquorRatio: 10.0,
                waterConsumption: 50.0,
                energyConsumption: 5.5,
                co2Emissions: 1.2,
                recyclingSystem: 'closed-loop',
                digitalPrinting: false,
                waterlessDyeing: false
              }
            }
          },
          { 
            stage: 'Garment Assembly (CMT)', 
            location: 'Istanbul, Turkey', 
            latitude: 41.00, 
            longitude: 28.97, 
            timestamp: new Date('2025-10-15'), 
            hash: '0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c', 
            verified: true,
            supplierId: factory.id,
            socialCompliance: {
              create: {
                factoryName: 'Orta Anadolu Assembly',
                auditStandard: 'SA8000',
                auditDate: new Date('2025-10-01'),
                auditResult: 'approved',
                workerCount: 350,
                femaleWorkerPercentage: 65.0,
                livingWageCompliance: true,
                workingHours: JSON.stringify({ regular: 40, overtime: 5, restDays: 2 }),
                safetyIncidents: 1,
                childLaborFree: true,
                forcedLaborFree: true,
                unionAccess: true,
                grievanceMechanism: true
              }
            }
          },
          { 
            stage: 'European Distribution Center', 
            location: 'Hamburg, Germany', 
            latitude: 53.55, 
            longitude: 9.99, 
            timestamp: new Date('2025-11-20'), 
            hash: '0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d', 
            verified: true 
          },
          { 
            stage: 'Retail Store', 
            location: 'Stockholm, Sweden', 
            latitude: 59.32, 
            longitude: 18.06, 
            timestamp: new Date('2025-12-05'), 
            hash: '0x1f2e3d4c5b6a7f8e9d0c1b2a3f4e5d6c', 
            verified: true 
          }
        ]
      },
      
      footprint: {
        create: {
          co2: 21.7,       // kg CO2e
          water: 6350,     // Liters
          energy: 45.2,    // kWh
          recycled: 68.0,  // %
          score: 'A'
        }
      },
      
      certifications: {
        create: [
          { name: 'Global Organic Textile Standard (GOTS)', number: 'GOTS-TR-2025-8842', expiry: new Date('2027-12-31'), documentUrl: 'https://example.com/certs/gots-8842.pdf' },
          { name: 'Global Recycled Standard (GRS)', number: 'GRS-TW-2025-1123', expiry: new Date('2027-12-31'), documentUrl: 'https://example.com/certs/grs-1123.pdf' },
          { name: 'OEKO-TEX Standard 100', number: 'OEKO-100-SE-445', expiry: new Date('2026-10-15'), documentUrl: 'https://example.com/certs/oeko-445.pdf' },
          { name: 'Fair Trade Certified', number: 'FT-TR-2025-992', expiry: new Date('2028-01-01'), documentUrl: 'https://example.com/certs/ft-992.pdf' }
        ]
      },
      
      qualityControls: {
        create: [
          {
            inspectionDate: new Date('2025-10-20'),
            inspectorId: 'INS-TR-9901',
            testType: 'safety',
            testResult: 'pass',
            testStandard: 'ISO 13934-1',
            measurements: JSON.stringify({ lengthTolerance: 1.0, widthTolerance: 1.0, weightTolerance: 2.5, colorDifference: 0.8 }),
            defects: JSON.stringify([{ type: 'stain', count: 0, severity: 'minor' }, { type: 'hole', count: 0, severity: 'critical' }]),
            overallGrade: 'A',
            certificateUrl: 'https://example.com/qc/report-1020.pdf'
          }
        ]
      },
      
      circularity: {
        create: {
          recyclability: 95.0,
          biodegradability: 80.0,
          compostability: false,
          disassemblyTime: 12,
          monoMaterial: false,
          recycledContent: 68.0,
          upcyclingPotential: 'high',
          takeBackProgram: true,
          repairabilityScore: 85.0,
          sparePartsAvailable: true,
          estimatedLifespan: 5,
          careInstructions: JSON.stringify({ washing: '30°C Machine Wash', drying: 'Line dry', ironing: 'Low heat', dryCleaning: 'Do not dry clean' })
        }
      }
    }
  })

  // Create an initial access log entry
  await prisma.accessLog.create({
    data: {
      gs1Uri: outfit.gs1Uri,
      roleUser: 'admin',
      action: 'PASSPORT_CREATED',
      ipHash: 'internal-system'
    }
  })

  console.log(`✅ Seeded Product: ${outfit.name}`)
  console.log(`   GS1 URI: ${outfit.gs1Uri}`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
