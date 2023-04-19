<script setup>
import moment from 'moment'
import { useMPUStore } from '@/stores/mpu'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const MPU = useMPUStore()

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
  _10: { sat: false, unsat: false, na: false }
})

const remark = ref('')
const inspector = ref({
  _1: { name: '', signature: false },
  _2: { name: '', signature: false },
  _3: { name: '', signature: false },
  _4: { name: '', signature: false }
})

onMounted(async () => {
  try {
    document.title =
      'TECHNICAL PUBLICATIONS/LIBRARY INSPECTION' +
      '' +
      `${moment(Date.now()).format('DD MMM YYYY HH:SS')}`

    const data = await MPU.readDetail(route.params.id)

    date.value = moment(data[0].date_time).format('YYYY-MM-DD HH:mm')
    company_name.value = data[0].company_name
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
    alert('ERROR PRINT MPU' + error)
  }
})
</script>
<template>
  <div class="" :id="route.params.id">
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
          TECHNICAL PUBLICATIONS/LIBRARY INSPECTION
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
                Does the organisation follow the policies and procedures for technical publications
                as described in the Company Maintenance Manual (CMM)?
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
              <td class="p-[4px]">
                Is the individual responsible for keeping publications current aware of his or her
                responsibilities?
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
              <td class="p-1">
                Does the company have technical and regulatory manuals available for the scope of
                work performed, such as:
                <ul class="pl-2">
                  <li>- the Aviation Regulations and associated standards;</li>
                  <li>- type approvals / type certificates;</li>
                  <li>- supplemental type approvals / supplemental type certificates;</li>
                  <li>
                    - manufacturer's maintenance, parts and overhaul manuals, service bulletins, and
                    service letters; and
                  </li>
                  <li>- the Company Maintenance Manual and other company manual?</li>
                </ul>
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
              <td class="p-[4px]">
                Are the technical publication current, i.e. are the amendments up to date?
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
              <td class="">
                Are the applicable portions of manuals available to concern maintenance personnel as
                outlined in the Company Maintenance Manual?
              </td>

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
                Does the organisation has an access to get a manufacture manual or approved data for
                major repair or alteration?
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
                Is data about a major repair or major alteration current and approved? Does the
                operator use the approved data for perform major repair or alteration?
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
              <td class="">
                Does the operator distribute the controlled documents in accordance with the Manual
                to include distribution, accountability, and availability
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
              <td class="p-[4px]">
                Does the operator have a system to kept current technical data?
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
                Is the data current and appropriate for the maintenance being performed that is used
                by the operator?
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
          </table>
        </div>
        <div class="border border-black h-[20%] mt-1">
          <p class="font-bold p-2">REMARK</p>
          <p class="px-4 text-justify first-letter:ml-10 h- overflow-hidden">
            {{ remark[0] }}
          </p>
        </div>
        <div class="mt-3 text-slate-400 text-sm float-left">DGCA Form No. 120-51 (Jun 2019)</div>
        <div class="mt-3 text-slate-400 text-sm float-right">Page 1 of 2</div>
      </div>
    </div>
    <div class="pagebreak"></div>
    <div class="page bg-white mx-auto">
      <div class="h-full">
        <div class="border border-black h-[85%]">
          <p class="font-bold p-2">REMARK (Cont'd)</p>
          <p class="px-4 text-justify first-letter:ml-10 h-[88%] overflow-hidden">
            {{ remark[1] }}
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
