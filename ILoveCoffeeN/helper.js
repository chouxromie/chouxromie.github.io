function Load()
{
  document.getElementById("version").textContent = "20201104";
}

function Check()
{
  var world_target = parseInt(document.getElementsByName("world_target")[0].value) * 10000;
  var garden_target = parseInt(document.getElementsByName("garden_target")[0].value) * 10000;
  var winter_target = parseInt(document.getElementsByName("winter_target")[0].value) * 10000;

  var world_full = parseInt(document.getElementsByName("world_full")[0].value);
  var garden_full = parseInt(document.getElementsByName("garden_full")[0].value);
  var winter_full = parseInt(document.getElementsByName("winter_full")[0].value);

  if (Number.isNaN(world_full)) world_full = 300000;
  if (Number.isNaN(garden_full)) garden_full = 300000;
  if (Number.isNaN(winter_full)) winter_full = 300000;

  var world_time = parseInt(document.getElementsByName("world_time")[0].value);
  var garden_time = parseInt(document.getElementsByName("garden_time")[0].value);
  var winter_time = parseInt(document.getElementsByName("winter_time")[0].value);

  var world_ads = 7500
  var other_ads = 5000
  var world_energy = 700
  var other_energy = 500
  var world_truck = 150
  var other_truck = 100

  var world_fulls = new Array();
  var garden_fulls = new Array();
  var winter_fulls = new Array();

  var tbody_result = document.getElementById("tbody_result");
  var tbody_sum = document.getElementById("tbody_sum");
  var tbody_alert = document.getElementById("tbody_alert");
  while (tbody_result.rows.length > 0) tbody_result.deleteRow(0);
  while (tbody_sum.rows.length > 0) tbody_sum.deleteRow(0);
  while (tbody_alert.rows.length > 0) tbody_alert.deleteRow(0);

  if (btoa(encodeURIComponent(document.getElementsByName("as")[0].value)) != 'JUVEJTgyJUI5JUVCJTlEJUJDJUVCJUI5JTg0JUVDJUI5JUI0')
  {
    alert("비밀번호가 틀렸습니다.");
    return;
  }

  for (var i = 0; i < 6; i++)
  {
    world_fulls.push(Math.round(world_full * (1 + 0.05 * i)));
    garden_fulls.push(Math.round(garden_full * (1 + 0.05 * i)));
    winter_fulls.push(Math.round(winter_full * (1 + 0.05 * i)));
  }

  var world_result = new Array();
  var garden_result = new Array();
  var winter_result = new Array();
  world_result = CalculateOneThemepark("리치월드", "world", world_target, world_fulls, world_ads, world_energy, world_truck, world_time);
  garden_result = CalculateOneThemepark("테마파크3", "garden", garden_target, garden_fulls, other_ads, other_energy, other_truck, garden_time);
  winter_result = CalculateOneThemepark("담당 템팤", "winter", winter_target, winter_fulls, other_ads, other_energy, other_truck, winter_time);

  var result_row = tbody_result.insertRow(tbody_result.rows.length);
  result_row.className = "result_row";
  var a_cell = result_row.insertCell(0);
  a_cell.innerHTML = "<b>총합</b>";
  var a_cell = result_row.insertCell(1);
  a_cell.innerHTML = world_result[0] + garden_result[0] + winter_result[0];
  var a_cell = result_row.insertCell(2);
  a_cell.innerHTML = numberWithCommas(world_result[1] + garden_result[1] + winter_result[1]);
  var result_cell = result_row.insertCell(3);
  result_cell.innerHTML = "<b>" + numberWithCommas(world_result[2] + garden_result[2] + winter_result[2]) + "</b>";
  var a_cell = result_row.insertCell(4);
  a_cell.innerHTML = numberWithCommas(world_result[3] + garden_result[3] + winter_result[3]);
  var a_cell = result_row.insertCell(5);
  a_cell.innerHTML = numberWithCommas(world_result[4] + garden_result[4] + winter_result[4]);
  var a_cell = result_row.insertCell(6);
  var total_time = world_result[5] + garden_result[5] + winter_result[5];
  var total_time_min = Math.floor(total_time / 60)
  var total_time_sec = total_time % 60;
  a_cell.innerHTML = total_time_min + "분 " + total_time_sec + "초";

  var alert_row = tbody_alert.insertRow(0);
  var a1 = alert_row.insertCell(0);
  a1.innerHTML = "[주의사항]";
  a1.className = "alert_header";
  var alert_row2 = tbody_alert.insertRow(1);
  var a2 = alert_row2.insertCell(0);
  a2.innerHTML = "경선 전 준비해야 하는 광고의 총 수량은 <br>"+
                "아래 결과표의 하단, 총합 값 + 납품용 트럭의 광고 최대치입니다. (풀광고 납품을 위해)<br>" +
                "예시) 납품용 트럭 광고 최대치: 57,500 / 경선에 소모되는 광고 총합: 135,000<br>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;▶ 준비해야 하는 광고 총량 = 57,500 + 135,000 = 192,500";
  a2.className = "alert";
}

function toggle_deliver_guide()
{
  var deliver_guide = document.getElementById("deliver_guide");
  if (deliver_guide.style.display == "none")
  {
    deliver_guide.style.display = "block";
  }
  else {
    deliver_guide.style.display = "none";
  }
}

function CalculateOneThemepark(title, className, target, fulls, ads, energy, truck, time)
{
  var deliver_sum = 0;

  var count = 0;

  while (deliver_sum < target)
  {
    deliver_sum += fulls[Math.min(5, count)];
    console.log(deliver_sum);

    count++;
  }

  var row = tbody_result.insertRow(tbody_result.rows.length);
  var target_place_cell = row.insertCell(0);
  target_place_cell.innerHTML = title;
  target_place_cell.className = className;
  var full_ads_count_cell = row.insertCell(1);
  full_ads_count_cell.innerHTML = numberWithCommas(count);
  var deliver_sum_cell = row.insertCell(2);
  deliver_sum_cell.innerHTML = numberWithCommas(deliver_sum);
  var total_ads_cell = row.insertCell(3);
  total_ads_cell.innerHTML = numberWithCommas(count * ads);
  total_ads_cell.className = "stepped";
  var total_energy_cell = row.insertCell(4);
  total_energy_cell.innerHTML = numberWithCommas(count * energy);
  var total_truck_cell = row.insertCell(5);
  total_truck_cell.innerHTML = numberWithCommas(count * truck);
  var total_time_cell = row.insertCell(6);
  var total_time = count * time;
  var total_time_min = Math.floor(total_time / 60)
  var total_time_sec = total_time % 60;
  total_time_cell.innerHTML = total_time_min + "분 " + total_time_sec + "초";

  return [count, deliver_sum, count * ads, count * energy, count  * truck, total_time];
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
