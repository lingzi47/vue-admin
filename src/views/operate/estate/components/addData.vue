<template>
  <div>
    <el-dialog
      class="AddDialog"
      :title="type == 1 ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
      width="800px"
      hegiht="1000px"
      :close-on-click-modal="false"
      @close="close"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        label-width="auto"
      >
        <el-row :gutter="15">
          <el-col :span="12">
            <el-form-item label="省市区" prop="value">
              <el-cascader
                v-model="ruleForm.value"
                :options="areaArr"
                :props="{ value: 'code', label: 'name' }"
                placeholder="请选择省市区"
                filterable
                @change="change"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="行政区域" prop="region">
              <el-select
                v-model="ruleForm.region"
                clearable
                style="width: 180px"
                filterable
                placeholder="请选择行政区域"
              >
                <el-option
                  v-for="item in list"
                  :value="item.id"
                  :label="item.name"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="精准房价" prop="accuratePrice">
              <el-input
                v-model="ruleForm.accuratePrice"
                style="width: 180px"
                placeholder="请输入"
              >
                <template slot="append">元/m²</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input
                v-model="ruleForm.address"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="楼栋数" prop="buildNum">
              <el-input
                v-model="ruleForm.buildNum"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单元数" prop="unitNum">
              <el-input
                v-model="ruleForm.unitNum"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建筑面积" prop="buildingArea">
              <el-input
                v-model="ruleForm.buildingArea"
                style="width: 180px"
                placeholder="请输入"
              >
                <template slot="append">m²</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="建筑类别" prop="buildingType">
              <el-select
                v-model="ruleForm.buildingType"
                clearable
                style="width: 180px"
                filterable
                value-key="item"
                placeholder="请选择建筑类别"
              >
                <el-option
                  v-for="(value, k) in arr6"
                  :label="value"
                  :key="k"
                  :value="k"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目特色" prop="characteristic">
              <el-input
                v-model="ruleForm.characteristic"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="充电桩数" prop="chargingPileNum">
              <el-input
                v-model="ruleForm.chargingPileNum"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总入驻企业数" prop="enterpriseNum">
              <el-input
                v-model="ruleForm.enterpriseNum"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日均人流量" prop="visitorsFlowrate">
              <el-input
                v-model="ruleForm.visitorsFlowrate"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="容积率" prop="cubageRate">
              <el-input
                v-model="ruleForm.cubageRate"
                style="width: 180px"
                placeholder="请输入"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="交房时间" prop="deliveryTime">
              <el-date-picker
                v-model="ruleForm.deliveryTime"
                type="datetime"
                value-format="timestamp"
                placeholder="选择交房时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="开发商" prop="developersName">
              <el-input
                v-model="ruleForm.developersName"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总电梯数" prop="elevatorNum">
              <el-input
                v-model="ruleForm.elevatorNum"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总住户数" prop="houseNum">
              <el-input
                v-model="ruleForm.houseNum"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="覆盖人数" prop="totalPeople">
              <el-input
                v-model="ruleForm.totalPeople"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入住率" prop="inHouseRate">
              <el-input
                v-model="ruleForm.inHouseRate"
                style="width: 180px"
                placeholder="请输入"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否是核心区" prop="isCore">
              <el-select
                clearable
                v-model="ruleForm.isCore"
                placeholder="是否是核心区"
                style="width: 180px"
              >
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物业公司" prop="management">
              <el-input
                v-model="ruleForm.management"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物业费" prop="managementPrice">
              <el-input
                v-model="ruleForm.managementPrice"
                style="width: 180px"
                placeholder="请输入"
              >
                <template slot="append">元/m²</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="绿化率" prop="greeningRate">
              <el-input
                v-model="ruleForm.greeningRate"
                style="width: 180px"
                placeholder="请输入"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最高楼层" prop="maxStorey">
              <el-input
                v-model="ruleForm.maxStorey"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最低楼层" prop="minStorey">
              <el-input
                v-model="ruleForm.minStorey"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="楼盘名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地面停车车位" prop="overgroundParkingNum">
              <el-input
                v-model="ruleForm.overgroundParkingNum"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地下停车车位" prop="undergroundParkingNum">
              <el-input
                v-model="ruleForm.undergroundParkingNum"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总停车车位" prop="parkingNum">
              <el-input
                v-model="ruleForm.parkingNum"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机信号" prop="phoneSignals">
              <el-select
                v-model="ruleForm.phoneSignals"
                clearable
                multiple
                style="width: 180px"
                filterable
                value-key="item"
                placeholder="请选择手机信号"
              >
                <el-option
                  v-for="(value, k) in arr4"
                  :label="value"
                  :key="k"
                  :value="k"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经度" prop="positionLng">
              <el-input
                v-model="ruleForm.positionLng"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="纬度" prop="positionLat">
              <el-input
                v-model="ruleForm.positionLat"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平均租金" prop="rentPrice">
              <el-input
                v-model="ruleForm.rentPrice"
                style="width: 180px"
                placeholder="请输入"
              >
                <template slot="append">元/m²</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="占地面积" prop="siteArea">
              <el-input
                v-model="ruleForm.siteArea"
                style="width: 180px"
                placeholder="请输入"
              >
                <template slot="append">m²</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物业类型" prop="type">
              <!-- 住宅- 11 ，商住楼- 12 ，综合体- 13 ，写字楼-14 -->
              <el-select
                clearable
                v-model="ruleForm.type"
                placeholder="请选择物业类型"
                style="width: 180px"
              >
                <el-option label="住宅" value="11"></el-option>
                <el-option label="商住楼" value="12"></el-option>
                <el-option label="综合体" value="13"></el-option>
                <el-option label="写字楼" value="14"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="竞争媒体" prop="competes">
              <el-select
                multiple
                v-model="ruleForm.competes"
                clearable
                style="width: 180px"
                filterable
                value-key="item"
                placeholder="请选择禁忌行业"
              >
                <el-option
                  v-for="(value, k) in arr5"
                  :label="value"
                  :key="k"
                  :value="k"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="签约终端数量" prop="signNum">
              <el-input
                v-model="ruleForm.signNum"
                style="width: 180px"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="签约类型" prop="signType">
              <el-select
                clearable
                v-model="ruleForm.signType"
                placeholder="请选择签约类型"
                style="width: 180px"
              >
                <el-option label="梯内屏" :value="1"></el-option>
                <el-option label="梯外屏" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="禁忌行业" prop="tabooIndustry">
              <el-select
                multiple
                v-model="ruleForm.tabooIndustry"
                clearable
                style="width: 180px"
                filterable
                value-key="item"
                placeholder="请选择禁忌行业"
              >
                <el-option
                  v-for="(value, k) in arr"
                  :label="value"
                  :key="k"
                  :value="k"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="楼盘图片" prop="img">
              <el-upload
                class="avatar-uploader"
                action="https://testboxapi.yujian02.xyz/api/common/ossUpload?file=file"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="img" :src="img" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  preadd,
  preEdit,
  preshow,
  getDic,
  taboo,
  listRegion,
} from "@/request/api";
import { areaListData } from "@/utils/area";
export default {
  name: "AddDialog",
  components: {},
  data() {
    return {
      type: "",
      img: "",
      id: "",
      areaArr: [],
      list: [],
      arr4: [],
      arr5: [],
      arr: [],
      arr6: [],
      dialogVisible: false,
      ruleForm: {
        accuratePrice: "",
        region: "",
        address: "",
        area: "",
        buildNum: "",
        unitNum: "",
        buildingArea: "",
        buildingType: "",
        characteristic: "",
        chargingPileNum: "",
        enterpriseNum: "",
        visitorsFlowrate: "",
        city: "",
        cubageRate: "",
        deliveryTime: "",
        developersName: "",
        elevatorNum: "",
        parkingNum: "",
        greeningRate: "",
        houseNum: "",
        totalPeople: "",
        inHouseRate: "",
        isCore: "",
        management: "",
        managementPrice: "",
        maxStorey: "",
        minStorey: "",
        name: "",
        value: [],
        overgroundParkingNum: "",
        undergroundParkingNum: "",
        phoneSignals: [],
        positionLng: "",
        positionLat: "",
        province: "",
        rentPrice: "",
        siteArea: "",
        type: "",
        competes: [],
        signList: "",
        signNum: "",
        signType: "",
        tabooIndustry: [],
        img: "",
      },
      xc_code: "",
      FormSearch: {},
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        img: [{ required: true, message: "请选择商品图片", trigger: "blur" }],
        accuratePrice: [{ required: true, message: "请输入", trigger: "blur" }],
        region: [{ required: true, message: "请选择", trigger: "blur" }],
        address: [{ required: true, message: "请输入", trigger: "blur" }],
        area: [{ required: true, message: "请输入", trigger: "blur" }],
        buildNum: [{ required: true, message: "请输入", trigger: "blur" }],
        unitNum: [{ required: true, message: "请输入", trigger: "blur" }],
        buildingArea: [{ required: true, message: "请输入", trigger: "blur" }],
        buildingType: [{ required: true, message: "请输入", trigger: "blur" }],
        characteristic: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        chargingPileNum: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        enterpriseNum: [{ required: true, message: "请输入", trigger: "blur" }],
        visitorsFlowrate: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        city: [{ required: true, message: "请输入", trigger: "blur" }],
        cubageRate: [{ required: true, message: "请输入", trigger: "blur" }],

        deliveryTime: [{ required: true, message: "请输入", trigger: "blur" }],
        developersName: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        elevatorNum: [{ required: true, message: "请输入", trigger: "blur" }],
        greeningRate: [{ required: true, message: "请输入", trigger: "blur" }],
        houseNum: [{ required: true, message: "请输入", trigger: "blur" }],
        totalPeople: [{ required: true, message: "请输入", trigger: "blur" }],
        inHouseRate: [{ required: true, message: "请输入", trigger: "blur" }],
        isCore: [{ required: true, message: "请输入", trigger: "blur" }],
        management: [{ required: true, message: "请输入", trigger: "blur" }],
        managementPrice: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        maxStorey: [{ required: true, message: "请输入", trigger: "blur" }],
        minStorey: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        overgroundParkingNum: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        undergroundParkingNum: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        parkingNum: [{ required: true, message: "请输入", trigger: "blur" }],
        phoneSignals: [{ required: true, message: "请输入", trigger: "blur" }],
        positionLng: [{ required: true, message: "请输入", trigger: "blur" }],
        positionLat: [{ required: true, message: "请输入", trigger: "blur" }],
        province: [{ required: true, message: "请输入", trigger: "blur" }],
        rentPrice: [{ required: true, message: "请输入", trigger: "blur" }],
        siteArea: [{ required: true, message: "请输入", trigger: "blur" }],
        type: [{ required: true, message: "请输入", trigger: "blur" }],
        competes: [{ required: true, message: "请输入", trigger: "blur" }],
        signList: [{ required: true, message: "请输入", trigger: "blur" }],
        signNum: [{ required: true, message: "请输入", trigger: "blur" }],
        signType: [{ required: true, message: "请输入", trigger: "blur" }],
        tabooIndustry: [{ required: true, message: "请输入", trigger: "blur" }],
        value: [{ required: true, message: "请选择省市区", trigger: "blur" }],
      },
    };
  },
  watch: {},
  created() {
    //深拷贝 复制表单初始值也就是所有元素为空的时候
    this.FormSearch = JSON.parse(JSON.stringify(this.ruleForm));
    this.setData(areaListData());
    this.areaArr = areaListData();
    this.zidian();
  },
  mounted() {},
  methods: {
    setData(data) {
      data.map((item) => {
        item["value"] = item.code;
        item["label"] = item.name;
        if (item.children) {
          this.setData(item.children);
        }
      });
    },
    change(data) {
      console.log(data);
      this.ruleForm.province = data[0];
      this.ruleForm.city = data[1];
      this.ruleForm.area = data[2];
    },
    show(type, item) {
      this.type = type;
      this.dialogVisible = true;
      if (type == 2) {
        this.xc_code = item.xc_code;
        console.log(item.id);
        this.id = item.id;
        let province = item.province + "";
        console.log(province);
        let city = item.city + "";
        let area = item.area + "";
        let arr1 = [];

        arr1.push(province);
        arr1.push(city);
        arr1.push(area);
        this.ruleForm.value = arr1;

        console.log(this.ruleForm.value);
        this.formshow();
      }
    },
    zidian() {
      getDic().then((res) => {
        this.arr4 = res.data.data.D0039;
        this.arr5 = res.data.data.D0040;
        this.arr6 = res.data.data.D0041;
      });

      taboo().then((res) => {
        console.log(res.data.data);
        this.arr = res.data.data;
      });
      let params = {
        page: 1,
        limit: 500,
      };
      listRegion(params).then((res) => {
        console.log(res.data.data);
        this.list = res.data.list;
      });
    },
    formshow() {
      let id = this.id;
      preshow(id).then((res) => {
        console.log(res.data.data[0]);
        this.ruleForm = res.data.data[0];
        this.img = this.ruleForm.img;
        let province = this.ruleForm.province + "";
        let city = this.ruleForm.city + "";
        let area = this.ruleForm.area + "";
        let arr1 = [];
        arr1.push(province);
        arr1.push(city);
        arr1.push(area);
        this.ruleForm.value = arr1;
        console.log(this.ruleForm.value);
        let phoneSignals = this.ruleForm.phoneSignals;
        let competes = this.ruleForm.competes;
        let tabooIndustry = this.ruleForm.tabooIndustry;
        this.ruleForm.phoneSignals = phoneSignals.split(",");
        this.ruleForm.competes = competes.split(",");
        this.ruleForm.tabooIndustry = tabooIndustry.split(",");
      });
    },
    //成功
    handleAvatarSuccess(res, file) {
      this.ruleForm.img = res;
      this.img = this.ruleForm.img;
    },
    //格式判断
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
    close() {
      this.dialogVisible = false;
      //清空时,反向深拷贝
      this.ruleForm = JSON.parse(JSON.stringify(this.FormSearch));
      this.img = "";
    },
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          if (this.type == 1) {
            let a = this.ruleForm.positionLng;
            let b = this.ruleForm.positionLat;
            let params = {
              position: [a, b].join(),
              accuratePrice: this.ruleForm.accuratePrice,
              parkingNum: this.ruleForm.parkingNum,
              region: this.ruleForm.region,
              address: this.ruleForm.address,
              area: this.ruleForm.area,
              buildNum: this.ruleForm.buildNum,
              unitNum: this.ruleForm.unitNum,
              buildingArea: this.ruleForm.buildingArea,
              buildingType: this.ruleForm.buildingType,
              characteristic: this.ruleForm.characteristic,
              chargingPileNum: this.ruleForm.chargingPileNum,
              enterpriseNum: this.ruleForm.enterpriseNum,
              visitorsFlowrate: this.ruleForm.visitorsFlowrate,
              city: this.ruleForm.city,
              cubageRate: this.ruleForm.cubageRate,
              deliveryTime: this.ruleForm.deliveryTime,
              developersName: this.ruleForm.developersName,
              elevatorNum: this.ruleForm.elevatorNum,
              greeningRate: this.ruleForm.greeningRate,
              houseNum: this.ruleForm.houseNum,
              totalPeople: this.ruleForm.totalPeople,
              inHouseRate: this.ruleForm.inHouseRate,
              isCore: this.ruleForm.isCore,
              management: this.ruleForm.management,
              managementPrice: this.ruleForm.managementPrice,
              maxStorey: this.ruleForm.maxStorey,
              minStorey: this.ruleForm.minStorey,
              name: this.ruleForm.name,

              overgroundParkingNum: this.ruleForm.overgroundParkingNum,
              undergroundParkingNum: this.ruleForm.undergroundParkingNum,
              phoneSignals: this.ruleForm.phoneSignals.join(),
              positionLng: this.ruleForm.positionLng,
              positionLat: this.ruleForm.positionLat,
              province: this.ruleForm.province,
              rentPrice: this.ruleForm.rentPrice,
              siteArea: this.ruleForm.siteArea,
              type: this.ruleForm.type,
              competes: this.ruleForm.competes.join(),
              signList: this.ruleForm.signList,
              signNum: this.ruleForm.signNum,
              signType: this.ruleForm.signType,
              tabooIndustry: this.ruleForm.tabooIndustry.join(),
              img: this.ruleForm.img,
            };
            console.log(params);
            preadd(params).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("新增成功");
                this.close();
                this.isDisable = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            let a = this.ruleForm.positionLng;
            let b = this.ruleForm.positionLat;
            let params = {
              position: [a, b].join(),
              accuratePrice: this.ruleForm.accuratePrice,
              region: this.ruleForm.region,
              address: this.ruleForm.address,
              area: this.ruleForm.area,
              parkingNum: this.ruleForm.parkingNum,
              buildNum: this.ruleForm.buildNum,
              unitNum: this.ruleForm.unitNum,
              buildingArea: this.ruleForm.buildingArea,
              buildingType: this.ruleForm.buildingType,
              characteristic: this.ruleForm.characteristic,
              chargingPileNum: this.ruleForm.chargingPileNum,
              enterpriseNum: this.ruleForm.enterpriseNum,
              visitorsFlowrate: this.ruleForm.visitorsFlowrate,
              city: this.ruleForm.city,
              cubageRate: this.ruleForm.cubageRate,
              deliveryTime: this.ruleForm.deliveryTime,
              developersName: this.ruleForm.developersName,
              elevatorNum: this.ruleForm.elevatorNum,
              greeningRate: this.ruleForm.greeningRate,
              houseNum: this.ruleForm.houseNum,
              totalPeople: this.ruleForm.totalPeople,
              inHouseRate: this.ruleForm.inHouseRate,
              isCore: this.ruleForm.isCore,
              management: this.ruleForm.management,
              managementPrice: this.ruleForm.managementPrice,
              maxStorey: this.ruleForm.maxStorey,
              minStorey: this.ruleForm.minStorey,
              name: this.ruleForm.name,

              overgroundParkingNum: this.ruleForm.overgroundParkingNum,
              undergroundParkingNum: this.ruleForm.undergroundParkingNum,
              phoneSignals: this.ruleForm.phoneSignals.join(),
              positionLng: this.ruleForm.positionLng,
              positionLat: this.ruleForm.positionLat,
              province: this.ruleForm.province,
              rentPrice: this.ruleForm.rentPrice,
              siteArea: this.ruleForm.siteArea,
              type: this.ruleForm.type,
              competes: this.ruleForm.competes.join(),
              signList: this.ruleForm.signList,
              signNum: this.ruleForm.signNum,
              signType: this.ruleForm.signType,
              tabooIndustry: this.ruleForm.tabooIndustry.join(),
              img: this.ruleForm.img,
              xc_code: this.xc_code,
            };
            let id = this.id;
            console.log(params);
            preEdit(params, id).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("修改成功");
                this.close();
                this.isDisable = false;
                this.$parent.getList();
              } else {
                this.$message.error(res.data.msg);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 100%;

  display: block;
}
</style>