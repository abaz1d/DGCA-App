<script setup>
import moment from 'moment'
import { useMPEStore } from '@/stores/mpe'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const MPE = useMPEStore()

const date = ref(moment(Date.now()).format('YYYY-MM-DD HH:mm'))
const company_name = ref()
const certificate_number = ref()
const certification = ref(false)
const surveillance = ref(false)

const checklist = ref({
  _1: { sat: false, unsat: false, na: false },
  _2: { sat: false, unsat: false, na: false },
  _3: { sat: false, unsat: false, na: false },
  _4: { sat: false, unsat: false, na: false },
  _5: { sat: false, unsat: false, na: false },
  _6: { sat: false, unsat: false, na: false },
  _7: { sat: false, unsat: false, na: false },
  _8: { sat: false, unsat: false, na: false },
  _9: { sat: false, unsat: false, na: false },
  _10: { sat: false, unsat: false, na: false },
  _11: { sat: false, unsat: false, na: false },
  _12: { sat: false, unsat: false, na: false },
  _13: { sat: false, unsat: false, na: false },
  _14: { sat: false, unsat: false, na: false },
  _15: { sat: false, unsat: false, na: false },
  _16: { sat: false, unsat: false, na: false },
  _17: { sat: false, unsat: false, na: false },
  _18: { sat: false, unsat: false, na: false }
})

const remark = ref('')
const inspector = ref({
  _1: { name: '', signature: false },
  _2: { name: '', signature: false },
  _3: { name: '', signature: false },
  _4: { name: '', signature: false }
})

const after = () => {
  console.log('after is')
}

onMounted(async () => {
  try {
    document.title =
      'MAINTENANCE PERSONNEL TRAINING PROGRAM, QUALIFICATION AND RECORD' +
      '' +
      `${moment(Date.now()).format('DD MMM YYYY HH:SS')}`

    const data = await MPE.readDetail(route.params.id)

    date.value = moment(data[0].date_time).format('YYYY-MM-DD HH:mm')
    certificate_number.value = data[0].certificate_number
    certification.value = data[0].type_inspection.certification
    surveillance.value = data[0].type_inspection.surveillance

    checklist.value = data[0].checklist

    inspector.value = data[0].inspector
    remark.value = data[0].remark

    setTimeout(() => {
      window.print()
      window.onfocus = () => {
        router.back()
      }
    }, 500)
  } catch (error) {
    alert('ERROR PRINT' + error)
  }
})
</script>
<template>
  <div class="" :id="route.params.id" :onafterprint="after">
    <div class="page bg-white mx-auto">
      <div class="h-full">
        <div class="border border-black flex">
          <div class="w-2/12 border-b border-black justify-end items-center">
            <img src="@/assets/images/logo512.png" alt="logo" class="mx-auto h-20" />
          </div>
          <div class="w-10/12 border-b border-black text-center align-middle">
            <span class="uppercase text-base font-bold -mb-1"
              >MINISTRY OF TRANSPORTATION DIRECTORATE GENERAL OF CIVIL AVIATION</span
            >
            <p class="text-[10px] mb-1 font-medium">
              Office Complex Soekarno - Hatta International Airport, C3 St., Tangerang, Banten -
              Indonesia
            </p>
            <p class="text-[10px] mb-1 font-medium">
              Telp. (6221) 225 66288, (+6221) 226 08887 Fax: (+6221) 225 66399
            </p>
            <p class="text-[10px] mb-1 font-medium">
              Website: hubud.dephub.go.id; e-mail: daao_dgca@dephub.go.id
            </p>
          </div>
        </div>
        <p class="w-full text-sm font-bold text-center border-b border-x border-black p-1">
          PART 121/135 AOC CERTIFICATION AND SURVEILLANCE CHECKLIST
        </p>
        <div class="flex border-x border-black text-sm">
          <div class="w-9/12">
            <div class="flex">
              <div class="w-3/12 border-black border-b border-r p-1">Company Name</div>
              <div class="w-9/12 border-b border-black p-1 uppercase">{{ company_name }}</div>
            </div>
            <div class="flex">
              <div class="w-3/12 border-black border-b border-r p-1">Certificate Number</div>
              <div class="w-9/12 border-b border-black p-1 uppercase">{{ certificate_number }}</div>
            </div>
          </div>
          <div class="w-3/12 border-b border-l border-black p-1">
            Date of Inspection:
            <p class="mt-1">{{ date }}</p>
          </div>
        </div>
        <p class="w-full text-sm font-bold text-center border-b border-x border-black p-1">
          MAINTENANCE PERSONNEL TRAINING PROGRAM, QUALIFICATION AND RECORD
        </p>
        <div class="flex border-b border-x border-black">
          <div class="w-2/12 p-1">Reference :</div>
          <div class="w-6/12 p-1">CASR 121.365; CASR 135.365</div>
          <div class="w-4/12 p-1">SI 8900-6.3; SI 8900-3.328</div>
        </div>
        <div class="flex border-x border-black font-bold">
          <div class="w-4/12 p-1">Type of Inspection :</div>
          <div class="w-3/12 p-1 flex">
            <CheckSquareIcon v-if="certification" class="mr-2 h-6 w-6" />
            <SquareIcon v-else class="mr-2 h-6 w-6" />
            <label for="certification">CERTIFICATION</label>
          </div>
          <div class="w-5/12 p-1 flex">
            <CheckSquareIcon v-if="surveillance" class="mr-2 h-6 w-6" />
            <SquareIcon v-else class="mr-2 h-6 w-6" />
            <label for="surveillance">SURVEILLANCE</label>
          </div>
        </div>
        <div class="w-full">
          <table class="text-sm">
            <tr class="">
              <th class="text-center">NO</th>
              <th class="text-center">SUBJECT</th>
              <th class="text-center">SAT</th>
              <th class="text-center">UNSAT</th>
              <th class="text-center">N/A</th>
            </tr>
            <tr class="">
              <td class="text-center w-10">1</td>
              <td class="">
                The operator has a training program to ensure each person is fully informed about
                procedures and techniques and equipment in use
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._1.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._1.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._1.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">2</td>
              <td class="">
                The operator has a training program to ensure each person is competent to perform
                his or her duties
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._2.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._2.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._2.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">3</td>
              <td class="">
                The training program covers initial, re-current and specialized training appropriate
                to the assigned tasks
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._3.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._3.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._3.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">4</td>
              <td class="">
                The training program covers the knowledge and skills related to human performance
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._4.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._4.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._4.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">5</td>
              <td class="">Does the organisation conduct approved cource for aircraft type?</td>

              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._5.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._5.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._5.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">6</td>
              <td class="">
                Does the organisation follow the recurrent training program as described in the
                Company Maintenance Manual?
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._6.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._6.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._6.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">7</td>
              <td class="">
                Is the person responsible for the program knowledgeable about his or her duties and
                responsibilities?
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._7.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._7.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._7.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">8</td>
              <td class="p-[4px]">
                Do new employees receive training in company policy and procedures?
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._8.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._8.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._8.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">9</td>
              <td class="">
                Do the files trace training records to with the individuals' present duties and
                responsibilities?
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._9.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._9.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._9.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">10</td>
              <td class="">
                Are maintenance personnel assigned to training courses as described in the Company
                Maintenance Manual?
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._10.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._10.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._10.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">11</td>
              <td class="p-[4px]">
                Are non-approved training courses controlled to ensure the quality?
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._11.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._11.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._11.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">12</td>
              <td class="p-[4px]">
                Are line station personnel properly trained? Are line station personnel properly
                trained?
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._12.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._12.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._12.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">13</td>
              <td class="">
                Is the training program for specialists (i.e. shop personnel, those in non-
                destructive testing (NDT) shops, the foreman) followed as described in the Company
                Maintenance Manual?
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._13.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._13.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._13.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">14</td>
              <td class="p-[4px]">
                Is maintenance training that has been contracted out monitored and recorded?
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._14.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._14.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._14.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">15</td>
              <td class="">
                Is there an accurate and current record-keeping system tracking all training as
                described in the Company Maintenance Manual?
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._15.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._15.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._15.na" />
              </td>
            </tr>
            <tr class="">
              <td class="text-center w-10">16</td>
              <td class="">
                Do the records reflect:
                <ol type="a">
                  <li>- the type of training;</li>
                  <li>- the location;</li>
                  <li>- the duration of training;</li>
                  <li>- the recurrent training program;</li>
                  <li>- examination control;</li>
                  <li>- the certificates issued; and</li>
                  <li>- the failure rate?</li>
                </ol>
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._16.sat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._16.unsat" />
              </td>
              <td class="text-center w-16">
                <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._16.na" />
              </td>
            </tr>
          </table>
        </div>
        <div class="mt-3 text-slate-400 text-sm float-left">DGCA Form No. 120-51 (Jun 2019)</div>
        <div class="mt-3 text-slate-400 text-sm float-right">Page 1 of 2</div>
      </div>
    </div>
    <div class="pagebreak"></div>
    <div class="page bg-white mx-auto">
      <div class="h-full">
        <table class="text-sm w-full mb-1">
          <tr class="">
            <td class="text-center w-10">17</td>
            <td class="">
              Are syllabi available for all training courses offered or contracted for by the
              company?
            </td>
            <td class="text-center w-16">
              <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._17.sat" />
            </td>
            <td class="text-center w-16">
              <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._17.unsat" />
            </td>
            <td class="text-center w-16">
              <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._17.na" />
            </td>
          </tr>
          <tr class="">
            <td class="text-center w-10">18</td>
            <td class="">
              Are all training materials and manuals clearly marked "for training purposes only"?
            </td>
            <td class="text-center w-16">
              <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._18.sat" />
            </td>
            <td class="text-center w-16">
              <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._18.unsat" />
            </td>
            <td class="text-center w-16">
              <CheckIcon class="mx-auto h-6 w-6" v-if="checklist._18.na" />
            </td>
          </tr>
        </table>
        <div class="border border-black h-[77%]">
          <p class="font-bold p-2">REMARK</p>
          <p class="px-4 text-justify first-letter:ml-10 h-[88%] overflow-hidden">
            {{ remark }}
          </p>
          <div class="px-4">
            <small class="text-xs italic">
              Note : Inspector must write necessary information to describe their inspection either
              with or without finding, contain at least references, area visited, method of
              inspection and inspection subject.
            </small>
          </div>
        </div>
        <div class="border-x border-b border-black h-[15%]">
          <p class="font-bold p-2">DGCA INSPECTOR</p>
          <div class="flex justify-center text-center mx-auto space-x-[30px]">
            <div class="">
              <div class="mx-auto w-20 h-20"></div>
              <p class="capitalize text-center">
                ( {{ inspector._1.name != '' ? inspector._1.name : '__________' }} )
              </p>
            </div>
            <div class="">
              <div class="mx-auto w-20 h-20"></div>
              <p class="capitalize text-center">
                ( {{ inspector._2.name != '' ? inspector._2.name : '__________' }} )
              </p>
            </div>
            <div class="">
              <div class="mx-auto w-20 h-20"></div>
              <p class="capitalize text-center">
                ( {{ inspector._3.name != '' ? inspector._3.name : '__________' }} )
              </p>
            </div>
            <div class="">
              <div class="mx-auto w-20 h-20"></div>
              <p class="capitalize text-center">
                ( {{ inspector._4.name != '' ? inspector._4.name : '__________' }} )
              </p>
            </div>
          </div>
        </div>
        <div class="mt-3 text-slate-400 text-sm float-left">DGCA Form No. 120-51 (Jun 2019)</div>
        <div class="mt-3 text-slate-400 text-sm float-right">Page 2 of 2</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page {
  width: 8.5in;
  height: 10.9in;
  /* width: 215mm;
  height: 330mm; */
}
td,
th {
  border: 1px solid #000;
  /* text-align: left; */
  /* padding: 1px; */
}
@media print {
  .pagebreak {
    clear: both;
    page-break-after: always;
  }
}
</style>
