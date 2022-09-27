import clicks from './clicks'

function App() {

  const res_arr = [];
  const final_arr = [];
  // Adding date object field
  const mod_clicks = clicks.map(ele => {
    return {
      ip: ele.ip,
      timestamp: new Date(ele.timestamp),
      org_timestamp: ele.timestamp,
      amount: ele.amount
    }
  })
  // sort above array mod_clicks based on ip, timestamp and amount
  const arr = mod_clicks.sort((a,b) => sorter(a,b))
  // sort custom function
  function sorter(a,b){
    const a_time = timestamp_calculator(a.timestamp)
    const b_time = timestamp_calculator(b.timestamp)
    if(a.ip>b.ip)
    return 1;
    if(b.ip>a.ip)
    return -1;
    if(a_time > b_time)
    return 1;
    if(b_time > a_time)
    return -1;
    if(a.amount > b.amount)
    return 1;
    if(b.amount > a.amount)
    return -1
  }
  // helper function required for sorting based on timestamp 
  function timestamp_calculator(t1){
      return ((t1.getFullYear())*365*24 + (t1.getMonth())*30*24 + (t1.getDate())*24 + t1.getHours());   
  }
  
  // map for keeping frequecy count of each ip in given array
  let ip_freq_map = new Map()
  for(let i=0;i<arr.length;i++){  
    if(ip_freq_map.has(arr[i].ip))
    ip_freq_map.set(arr[i].ip,(ip_freq_map.get(arr[i].ip))+1)
    else
    ip_freq_map.set(arr[i].ip,1)
  }
  // Pointer for last element of array
  let top = -1;
  // Filter the array based on given conditions 1 and 2
  for(let i=0;i<arr.length;i++){
    if(!res_arr.length){
      res_arr.push(arr[i])
      top++;
    }    
    else{
        if(res_arr[top].ip!==arr[i].ip){
          res_arr.push(arr[i])
          top++
        }
        else{
          if(res_arr[top].timestamp.getHours() === arr[i].timestamp.getHours()){
            if(res_arr[top].amount === arr[i].amount){
              if(res_arr[top].timestamp.getTime() > arr[i].timestamp.getTime()){
                res_arr.pop()
                top--;
                res_arr.push(arr[i])
                top++
              }             
            }
            else{
              if(res_arr[top].amount < arr[i].amount ){
                res_arr.pop()
                top--;
                res_arr.push(arr[i])
                top++
              }
            }
          }
          else{
            res_arr.push(arr[i])
            top++
          }
        }

    }
  }
  // Filter elememts from array based on condition 3
  for(let i=0;i<res_arr.length;i++){
    if(ip_freq_map.get(res_arr[i].ip)<=10){
      final_arr.push(res_arr[i])
    } 
  }
  // date object to date and time string
  const final_arr1 = final_arr.map(ele => {
    return{
      ip: ele.ip,
      timestamp: ele.org_timestamp,
      amount: ele.amount
    }
  })
  // final result array
  console.log('final result',final_arr1)

  return(
    <div>
      <h1 data-testid='result'>Please find the result in result-set.json file</h1>
    </div>
  )
}

export default App;
