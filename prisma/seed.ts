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

  console.log('Seeding suppliers...')

  // ── Shared Tier 4 Farms ───────────────────────────────────────────────────
  const cottonFarm = await prisma.supplier.create({
    data: { name: 'Izmir Organic Cotton Coop', tier: 4, location: 'Izmir, Turkey', certified: true }
  })
  const polyFarm = await prisma.supplier.create({
    data: { name: 'Saigon rPET Recycling Hub', tier: 4, location: 'Ho Chi Minh, Vietnam', certified: true }
  })
  const denimFarm = await prisma.supplier.create({
    data: { name: 'Dhaka Denim Cotton Farm', tier: 4, location: 'Dhaka, Bangladesh', certified: true }
  })

  // ── Tier 3 Yarn Spinners ──────────────────────────────────────────────────
  const cottonYarn = await prisma.supplier.create({
    data: { name: 'Gaziantep Yarn Co.', tier: 3, location: 'Gaziantep, Turkey', certified: true, parentId: cottonFarm.id }
  })
  const polyYarn = await prisma.supplier.create({
    data: { name: 'Hanoi Filament Works', tier: 3, location: 'Hanoi, Vietnam', certified: true, parentId: polyFarm.id }
  })
  const deniYarn = await prisma.supplier.create({
    data: { name: 'Chittagong Spinning Mill', tier: 3, location: 'Chittagong, Bangladesh', certified: true, parentId: denimFarm.id }
  })

  // ── Tier 2 Fabric Mills ───────────────────────────────────────────────────
  const cottonMill = await prisma.supplier.create({
    data: { name: 'Anadolu Textile Mills', tier: 2, location: 'Bursa, Turkey', certified: true, parentId: cottonYarn.id }
  })
  const polyMill = await prisma.supplier.create({
    data: { name: 'Mekong Fabric Co.', tier: 2, location: 'Ho Chi Minh, Vietnam', certified: true, parentId: polyYarn.id }
  })
  const deniMill = await prisma.supplier.create({
    data: { name: 'Blue Planet Denim Mills', tier: 2, location: 'Dhaka, Bangladesh', certified: true, parentId: deniYarn.id }
  })

  // ── Tier 1 Assembly Factories ─────────────────────────────────────────────
  const tshirtFactory = await prisma.supplier.create({
    data: { name: 'Orta Anadolu Assembly (T-Shirt)', tier: 1, location: 'Istanbul, Turkey', certified: true, parentId: cottonMill.id }
  })
  const jeanFactory = await prisma.supplier.create({
    data: { name: 'Dhaka Apparel Ltd (Jeans)', tier: 1, location: 'Dhaka, Bangladesh', certified: true, parentId: deniMill.id }
  })
  const jacketFactory = await prisma.supplier.create({
    data: { name: 'Saigon Outerwear Co. (Jacket)', tier: 1, location: 'Ho Chi Minh, Vietnam', certified: true, parentId: polyMill.id }
  })

  // ══════════════════════════════════════════════════════════════════════════
  // PRODUCT 1: Organic Cotton T-Shirt
  // ══════════════════════════════════════════════════════════════════════════
  console.log('Seeding T-Shirt...')
  const tshirt = await prisma.product.create({
    data: {
      gs1Uri: 'https://dpp.chainledger.io/01/0001',
      reoId: 'CL-REO-TSHIRT-001',
      shaclValidationStatus: 'Valid',
      accessRules: JSON.stringify({
        consumer: ['name', 'brand', 'materials', 'footprint', 'circularity'],
        brand: ['materials', 'processes', 'certifications', 'qualityControls', 'footprint', 'suppliers_full'],
        recycler: ['circularity', 'materials_detailed', 'disassembly_instructions', 'chemical_profile']
      }),
      eidasAccessLevel: 'low',
      sku: 'CL-TSHIRT-2026',
      name: 'Organic Cotton T-Shirt',
      brand: 'Chainledger x H&M',
      category: 'T-Shirts',
      description: 'A premium organic cotton tee, GOTS-certified and grown without pesticides in the Izmir Valley. Knitted in a low-impact facility using 100% renewable energy.',

      materials: {
        create: [
          {
            name: 'Organic Cotton',
            type: 'Fiber',
            percentage: 100,
            origin: 'Izmir, Turkey',
            latitude: 38.42,
            longitude: 27.14,
            certified: true,
            standard: 'GOTS',
            supplierId: cottonFarm.id,
            quality: {
              create: {
                fiberLength: 34.5,
                fiberFineness: 4.2,
                tensileStrength: 360.0,
                moistureRegain: 8.8,
                colorGrade: 'High White',
                impurityLevel: 0.9,
                harvestDate: new Date('2025-07-20'),
                batchNumber: 'ORG-COT-2025-IZM-07',
                farmCertification: 'GOTS',
                pesticideFree: true,
                waterSource: 'Drip Irrigation',
                soilHealthScore: 9,
                carbonSequestration: 1.8
              }
            }
          }
        ]
      },

      processes: {
        create: [
          {
            stage: 'Cotton Harvesting',
            location: 'Izmir, Turkey',
            latitude: 38.42, longitude: 27.14,
            timestamp: new Date('2025-07-20'),
            hash: '0xa1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6',
            verified: true,
            supplierId: cottonFarm.id,
            socialCompliance: {
              create: {
                factoryName: 'Izmir Organic Cotton Coop',
                auditStandard: 'Fair Trade',
                auditDate: new Date('2025-07-01'),
                auditResult: 'approved',
                workerCount: 48,
                femaleWorkerPercentage: 58.0,
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
            stage: 'Yarn Spinning',
            location: 'Gaziantep, Turkey',
            latitude: 37.06, longitude: 37.38,
            timestamp: new Date('2025-08-15'),
            hash: '0xb2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7',
            verified: true,
            supplierId: cottonYarn.id
          },
          {
            stage: 'Knitting & Finishing',
            location: 'Bursa, Turkey',
            latitude: 40.18, longitude: 29.06,
            timestamp: new Date('2025-09-05'),
            hash: '0xc3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8',
            verified: true,
            supplierId: cottonMill.id,
            weavingProcesses: {
              create: {
                technique: 'knitting',
                machineType: 'circular-knit',
                gauge: 28,
                density: 130.0,
                fabricWeight: 160.0,
                fabricWidth: 150.0,
                shrinkageRate: 2.5,
                pillingResistance: 5,
                abrasionResistance: 4,
                productionSpeed: 30.0,
                defectRate: 0.3
              }
            },
            dyeingProcesses: {
              create: {
                dyeType: 'low-impact reactive',
                dyeClass: 'reactive',
                colorFastness: JSON.stringify({ washing: 5, light: 7, rubbing: 4, perspiration: 5 }),
                dyeingMethod: 'batch',
                liquorRatio: 8.0,
                waterConsumption: 40.0,
                energyConsumption: 4.2,
                co2Emissions: 0.9,
                recyclingSystem: 'closed-loop',
                digitalPrinting: false,
                waterlessDyeing: false
              }
            }
          },
          {
            stage: 'Garment Assembly',
            location: 'Istanbul, Turkey',
            latitude: 41.00, longitude: 28.97,
            timestamp: new Date('2025-10-01'),
            hash: '0xd4e5f6a7b8c9d0e1f2a3b4c5d6e7f8g9',
            verified: true,
            supplierId: tshirtFactory.id,
            socialCompliance: {
              create: {
                factoryName: 'Orta Anadolu Assembly',
                auditStandard: 'SA8000',
                auditDate: new Date('2025-09-15'),
                auditResult: 'approved',
                workerCount: 180,
                femaleWorkerPercentage: 62.0,
                livingWageCompliance: true,
                workingHours: JSON.stringify({ regular: 40, overtime: 4, restDays: 2 }),
                safetyIncidents: 0,
                childLaborFree: true,
                forcedLaborFree: true,
                unionAccess: true,
                grievanceMechanism: true
              }
            }
          },
          {
            stage: 'EU Distribution Hub',
            location: 'Hamburg, Germany',
            latitude: 53.55, longitude: 9.99,
            timestamp: new Date('2025-11-01'),
            hash: '0xe5f6a7b8c9d0e1f2a3b4c5d6e7f8h0',
            verified: true
          },
          {
            stage: 'Retail Store',
            location: 'Stockholm, Sweden',
            latitude: 59.32, longitude: 18.06,
            timestamp: new Date('2025-11-20'),
            hash: '0xf6a7b8c9d0e1f2a3b4c5d6e7f8h0i1',
            verified: true
          }
        ]
      },

      footprint: {
        create: { co2: 8.4, water: 2100, energy: 18.5, recycled: 0, score: 'A' }
      },

      certifications: {
        create: [
          { name: 'GOTS Certified', number: 'GOTS-TR-2025-0911', expiry: new Date('2027-12-31'), documentUrl: '#' },
          { name: 'OEKO-TEX Standard 100', number: 'OEKO-100-SE-221', expiry: new Date('2026-10-15'), documentUrl: '#' },
          { name: 'Fair Trade Certified', number: 'FT-TR-2025-441', expiry: new Date('2028-01-01'), documentUrl: '#' }
        ]
      },

      qualityControls: {
        create: [{
          inspectionDate: new Date('2025-10-05'),
          inspectorId: 'INS-TR-0011',
          testType: 'safety',
          testResult: 'pass',
          testStandard: 'ISO 13934-1',
          measurements: JSON.stringify({ lengthTolerance: 0.8, widthTolerance: 0.8, weightTolerance: 2.0 }),
          defects: JSON.stringify([{ type: 'stain', count: 0 }, { type: 'hole', count: 0 }]),
          overallGrade: 'A',
          certificateUrl: '#'
        }]
      },

      circularity: {
        create: {
          recyclability: 98.0,
          biodegradability: 90.0,
          compostability: true,
          disassemblyTime: 5,
          monoMaterial: true,
          recycledContent: 0,
          upcyclingPotential: 'very high',
          takeBackProgram: true,
          repairabilityScore: 92.0,
          sparePartsAvailable: false,
          estimatedLifespan: 6,
          careInstructions: JSON.stringify({ washing: '30°C Machine Wash', drying: 'Line dry', ironing: 'Low heat' })
        }
      }
    }
  })

  // ══════════════════════════════════════════════════════════════════════════
  // PRODUCT 2: Recycled Denim Jean
  // ══════════════════════════════════════════════════════════════════════════
  console.log('Seeding Jeans...')
  const jean = await prisma.product.create({
    data: {
      gs1Uri: 'https://dpp.chainledger.io/01/0002',
      reoId: 'CL-REO-JEAN-002',
      shaclValidationStatus: 'Valid',
      accessRules: JSON.stringify({
        consumer: ['name', 'brand', 'materials', 'footprint', 'circularity'],
        brand: ['materials', 'processes', 'certifications', 'qualityControls', 'footprint', 'suppliers_full'],
        recycler: ['circularity', 'materials_detailed', 'disassembly_instructions', 'chemical_profile']
      }),
      eidasAccessLevel: 'low',
      sku: 'CL-JEAN-2026',
      name: 'Recycled Denim Jean',
      brand: 'Chainledger x H&M',
      category: 'Jeans',
      description: 'Crafted from 70% post-consumer recycled denim and 30% organic cotton. Stonewashed using ozone technology to eliminate 75% of the water traditionally used in finishing.',

      materials: {
        create: [
          {
            name: 'Post-Consumer Recycled Denim',
            type: 'Fabric',
            percentage: 70,
            origin: 'Dhaka, Bangladesh',
            latitude: 23.81, longitude: 90.41,
            certified: true,
            standard: 'RCS',
            supplierId: deniMill.id,
            quality: {
              create: {
                fiberLength: 22.0,
                fiberFineness: 5.8,
                tensileStrength: 280.0,
                moistureRegain: 7.5,
                colorGrade: 'Indigo Medium',
                impurityLevel: 2.1,
                harvestDate: new Date('2025-03-10'),
                batchNumber: 'REC-DEN-2025-03-BD',
                farmCertification: 'RCS',
                pesticideFree: false,
                waterSource: 'Municipal',
                soilHealthScore: 6,
                carbonSequestration: 0.4
              }
            }
          },
          {
            name: 'Organic Cotton',
            type: 'Fiber',
            percentage: 30,
            origin: 'Dhaka, Bangladesh',
            latitude: 23.81, longitude: 90.41,
            certified: true,
            standard: 'GOTS',
            supplierId: denimFarm.id
          }
        ]
      },

      processes: {
        create: [
          {
            stage: 'Cotton Farming & Recycled Fibre Collection',
            location: 'Dhaka, Bangladesh',
            latitude: 23.81, longitude: 90.41,
            timestamp: new Date('2025-03-10'),
            hash: '0xjean1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
            verified: true,
            supplierId: denimFarm.id,
            socialCompliance: {
              create: {
                factoryName: 'Dhaka Denim Cotton Farm',
                auditStandard: 'ILO Core Conventions',
                auditDate: new Date('2025-02-15'),
                auditResult: 'approved',
                workerCount: 120,
                femaleWorkerPercentage: 45.0,
                livingWageCompliance: true,
                workingHours: JSON.stringify({ regular: 40, overtime: 6, restDays: 1 }),
                safetyIncidents: 1,
                childLaborFree: true,
                forcedLaborFree: true,
                unionAccess: false,
                grievanceMechanism: true
              }
            }
          },
          {
            stage: 'Yarn Spinning',
            location: 'Chittagong, Bangladesh',
            latitude: 22.37, longitude: 91.80,
            timestamp: new Date('2025-04-20'),
            hash: '0xjean2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
            verified: true,
            supplierId: deniYarn.id
          },
          {
            stage: 'Denim Weaving',
            location: 'Dhaka, Bangladesh',
            latitude: 23.81, longitude: 90.41,
            timestamp: new Date('2025-05-15'),
            hash: '0xjean3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
            verified: true,
            supplierId: deniMill.id,
            weavingProcesses: {
              create: {
                technique: 'weaving',
                machineType: 'rapier-loom',
                gauge: 12,
                density: 340.0,
                fabricWeight: 320.0,
                fabricWidth: 155.0,
                shrinkageRate: 4.0,
                pillingResistance: 5,
                abrasionResistance: 5,
                productionSpeed: 18.0,
                defectRate: 0.7
              }
            },
            chemicalTreatments: {
              create: {
                treatmentType: 'stonewash-ozone',
                chemicalName: 'Ozone Gas',
                chemicalCAS: '10028-15-6',
                concentration: 0.8,
                applicationMethod: 'gaseous',
                temperature: 25.0,
                duration: 30,
                pHLevel: 7.0,
                zdhcCompliant: true,
                oekoTexCertified: true,
                sideEffects: JSON.stringify([{ effect: 'None detected', severity: 'negligible', affectedPopulation: 'none' }]),
                wastewaterTreatment: 'ozone-decomposition',
                chemicalRecovery: 98.0,
                allergenInfo: 'Non-allergenic'
              }
            }
          },
          {
            stage: 'Garment Cut & Sew',
            location: 'Dhaka, Bangladesh',
            latitude: 23.81, longitude: 90.41,
            timestamp: new Date('2025-06-20'),
            hash: '0xjean4d5e6f7a8b9c0d1e2f3a4b5c6d7e',
            verified: true,
            supplierId: jeanFactory.id,
            socialCompliance: {
              create: {
                factoryName: 'Dhaka Apparel Ltd',
                auditStandard: 'WRAP',
                auditDate: new Date('2025-06-01'),
                auditResult: 'approved',
                workerCount: 420,
                femaleWorkerPercentage: 72.0,
                livingWageCompliance: true,
                workingHours: JSON.stringify({ regular: 40, overtime: 8, restDays: 1 }),
                safetyIncidents: 2,
                childLaborFree: true,
                forcedLaborFree: true,
                unionAccess: true,
                grievanceMechanism: true
              }
            }
          },
          {
            stage: 'EU Logistics Hub',
            location: 'Rotterdam, Netherlands',
            latitude: 51.92, longitude: 4.47,
            timestamp: new Date('2025-08-10'),
            hash: '0xjean5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
            verified: true
          },
          {
            stage: 'Retail Store',
            location: 'Stockholm, Sweden',
            latitude: 59.32, longitude: 18.06,
            timestamp: new Date('2025-09-01'),
            hash: '0xjean6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
            verified: true
          }
        ]
      },

      footprint: {
        create: { co2: 18.2, water: 3800, energy: 38.0, recycled: 70, score: 'B' }
      },

      certifications: {
        create: [
          { name: 'Recycled Content Standard (RCS)', number: 'RCS-BD-2025-5321', expiry: new Date('2027-06-30'), documentUrl: '#' },
          { name: 'GOTS Certified Cotton', number: 'GOTS-BD-2025-1180', expiry: new Date('2027-12-31'), documentUrl: '#' },
          { name: 'Bluesign Approved', number: 'BLUE-BD-2025-228', expiry: new Date('2027-01-01'), documentUrl: '#' }
        ]
      },

      qualityControls: {
        create: [{
          inspectionDate: new Date('2025-07-01'),
          inspectorId: 'INS-BD-0042',
          testType: 'durability',
          testResult: 'pass',
          testStandard: 'ISO 13935-1',
          measurements: JSON.stringify({ seamStrength: 420, colorFastness: 4.5, shrinkage: 3.2 }),
          defects: JSON.stringify([{ type: 'broken-thread', count: 0 }, { type: 'uneven-dye', count: 0 }]),
          overallGrade: 'B',
          certificateUrl: '#'
        }]
      },

      circularity: {
        create: {
          recyclability: 85.0,
          biodegradability: 60.0,
          compostability: false,
          disassemblyTime: 20,
          monoMaterial: false,
          recycledContent: 70,
          upcyclingPotential: 'high',
          takeBackProgram: true,
          repairabilityScore: 80.0,
          sparePartsAvailable: true,
          estimatedLifespan: 8,
          careInstructions: JSON.stringify({ washing: '40°C Inside-out', drying: 'Line dry', ironing: 'Do not iron' })
        }
      }
    }
  })

  // ══════════════════════════════════════════════════════════════════════════
  // PRODUCT 3: rPET Quilted Jacket
  // ══════════════════════════════════════════════════════════════════════════
  console.log('Seeding Jacket...')
  const jacket = await prisma.product.create({
    data: {
      gs1Uri: 'https://dpp.chainledger.io/01/0003',
      reoId: 'CL-REO-JACKET-003',
      shaclValidationStatus: 'Valid',
      accessRules: JSON.stringify({
        consumer: ['name', 'brand', 'materials', 'footprint', 'circularity'],
        brand: ['materials', 'processes', 'certifications', 'qualityControls', 'footprint', 'suppliers_full'],
        recycler: ['circularity', 'materials_detailed', 'disassembly_instructions', 'chemical_profile']
      }),
      eidasAccessLevel: 'low',
      sku: 'CL-JACKET-2026',
      name: 'rPET Quilted Jacket',
      brand: 'Chainledger x H&M',
      category: 'Outerwear',
      description: 'Made from 100% recycled plastic bottles (rPET). Each jacket diverts approximately 38 PET bottles from landfill. Water-repellent finish without harmful PFCs.',

      materials: {
        create: [
          {
            name: 'Recycled Polyester (rPET)',
            type: 'Fabric',
            percentage: 88,
            origin: 'Ho Chi Minh, Vietnam',
            latitude: 10.82, longitude: 106.62,
            certified: true,
            standard: 'GRS',
            supplierId: polyFarm.id,
            quality: {
              create: {
                fiberLength: 38.0,
                fiberFineness: 1.2,
                tensileStrength: 480.0,
                moistureRegain: 0.4,
                colorGrade: 'Black Opaque',
                impurityLevel: 0.5,
                harvestDate: new Date('2025-04-01'),
                batchNumber: 'RPET-VN-2025-04A',
                farmCertification: 'GRS',
                pesticideFree: true,
                waterSource: 'Closed-loop rinse water',
                soilHealthScore: 0,
                carbonSequestration: 0.0
              }
            }
          },
          {
            name: 'Recycled Nylon Lining',
            type: 'Fabric',
            percentage: 12,
            origin: 'Hanoi, Vietnam',
            latitude: 21.03, longitude: 105.85,
            certified: true,
            standard: 'GRS',
            supplierId: polyYarn.id
          }
        ]
      },

      processes: {
        create: [
          {
            stage: 'PET Bottle Collection & Sorting',
            location: 'Ho Chi Minh, Vietnam',
            latitude: 10.82, longitude: 106.62,
            timestamp: new Date('2025-04-01'),
            hash: '0xjkt1a2b3c4d5e6f7a8b9c0d1e2f3a4b',
            verified: true,
            supplierId: polyFarm.id,
            socialCompliance: {
              create: {
                factoryName: 'Saigon rPET Recycling Hub',
                auditStandard: 'Fair Trade',
                auditDate: new Date('2025-03-15'),
                auditResult: 'approved',
                workerCount: 65,
                femaleWorkerPercentage: 40.0,
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
            stage: 'rPET Filament Extrusion',
            location: 'Hanoi, Vietnam',
            latitude: 21.03, longitude: 105.85,
            timestamp: new Date('2025-05-01'),
            hash: '0xjkt2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
            verified: true,
            supplierId: polyYarn.id
          },
          {
            stage: 'Fabric Weaving & Lamination',
            location: 'Ho Chi Minh, Vietnam',
            latitude: 10.82, longitude: 106.62,
            timestamp: new Date('2025-06-10'),
            hash: '0xjkt3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
            verified: true,
            supplierId: polyMill.id,
            weavingProcesses: {
              create: {
                technique: 'weaving',
                machineType: 'air-jet-loom',
                gauge: 8,
                density: 180.0,
                fabricWeight: 210.0,
                fabricWidth: 155.0,
                shrinkageRate: 1.2,
                pillingResistance: 5,
                abrasionResistance: 5,
                productionSpeed: 22.0,
                defectRate: 0.2
              }
            },
            chemicalTreatments: {
              create: {
                treatmentType: 'C0-DWR-coating',
                chemicalName: 'C0 Durable Water Repellent',
                chemicalCAS: 'non-PFC-formulation',
                concentration: 3.5,
                applicationMethod: 'pad-dry-cure',
                temperature: 140.0,
                duration: 90,
                pHLevel: 6.5,
                zdhcCompliant: true,
                oekoTexCertified: true,
                sideEffects: JSON.stringify([{ effect: 'None', severity: 'none', affectedPopulation: 'none' }]),
                wastewaterTreatment: 'biological',
                chemicalRecovery: 92.0,
                allergenInfo: 'PFC-free, non-allergenic'
              }
            }
          },
          {
            stage: 'Jacket Quilting & Assembly',
            location: 'Ho Chi Minh, Vietnam',
            latitude: 10.82, longitude: 106.62,
            timestamp: new Date('2025-07-20'),
            hash: '0xjkt4d5e6f7a8b9c0d1e2f3a4b5c6d7e',
            verified: true,
            supplierId: jacketFactory.id,
            socialCompliance: {
              create: {
                factoryName: 'Saigon Outerwear Co.',
                auditStandard: 'amfori BSCI',
                auditDate: new Date('2025-07-01'),
                auditResult: 'approved',
                workerCount: 290,
                femaleWorkerPercentage: 68.0,
                livingWageCompliance: true,
                workingHours: JSON.stringify({ regular: 40, overtime: 5, restDays: 2 }),
                safetyIncidents: 0,
                childLaborFree: true,
                forcedLaborFree: true,
                unionAccess: true,
                grievanceMechanism: true
              }
            }
          },
          {
            stage: 'EU Logistics Hub',
            location: 'Antwerp, Belgium',
            latitude: 51.22, longitude: 4.40,
            timestamp: new Date('2025-09-15'),
            hash: '0xjkt5e6f7a8b9c0d1e2f3a4b5c6d7e8f',
            verified: true
          },
          {
            stage: 'Retail Store',
            location: 'Stockholm, Sweden',
            latitude: 59.32, longitude: 18.06,
            timestamp: new Date('2025-10-05'),
            hash: '0xjkt6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
            verified: true
          }
        ]
      },

      footprint: {
        create: { co2: 14.1, water: 1200, energy: 32.0, recycled: 88, score: 'A' }
      },

      certifications: {
        create: [
          { name: 'Global Recycled Standard (GRS)', number: 'GRS-VN-2025-8831', expiry: new Date('2027-12-31'), documentUrl: '#' },
          { name: 'bluesign APPROVED', number: 'BLUE-VN-2025-441', expiry: new Date('2026-12-31'), documentUrl: '#' },
          { name: 'Cradle to Cradle Silver', number: 'C2C-VN-2025-112', expiry: new Date('2028-06-01'), documentUrl: '#' }
        ]
      },

      qualityControls: {
        create: [{
          inspectionDate: new Date('2025-07-25'),
          inspectorId: 'INS-VN-0077',
          testType: 'weather-resistance',
          testResult: 'pass',
          testStandard: 'ISO 4920:2012',
          measurements: JSON.stringify({ waterRepellency: 90, windResistance: 95, thermalInsulation: 88 }),
          defects: JSON.stringify([{ type: 'seam-failure', count: 0 }, { type: 'zipper-defect', count: 0 }]),
          overallGrade: 'A',
          certificateUrl: '#'
        }]
      },

      circularity: {
        create: {
          recyclability: 90.0,
          biodegradability: 10.0,
          compostability: false,
          disassemblyTime: 15,
          monoMaterial: false,
          recycledContent: 88,
          upcyclingPotential: 'medium',
          takeBackProgram: true,
          repairabilityScore: 78.0,
          sparePartsAvailable: true,
          estimatedLifespan: 10,
          careInstructions: JSON.stringify({ washing: '30°C Gentle cycle', drying: 'Tumble dry low', ironing: 'Do not iron' })
        }
      }
    }
  })

  // Access logs
  for (const p of [tshirt, jean, jacket]) {
    await prisma.accessLog.create({
      data: { gs1Uri: p.gs1Uri, roleUser: 'admin', action: 'PASSPORT_CREATED', ipHash: 'internal-system' }
    })
  }

  console.log(`✅ Seeded T-Shirt:  ${tshirt.name}  (${tshirt.gs1Uri})`)
  console.log(`✅ Seeded Jean:     ${jean.name}  (${jean.gs1Uri})`)
  console.log(`✅ Seeded Jacket:   ${jacket.name}  (${jacket.gs1Uri})`)
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
