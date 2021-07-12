import { check, sleep } from 'k6';
import grpc from 'k6/net/grpc';
const client = new grpc.Client();

client.load(['../definitions'], 'hello.proto');

export default (): void => {
  client.connect('grpcbin.test.k6.io:9001', {
    // plaintext: false
  });
  const data = { greeting: 'Bert' };
  const response = client.invoke('hello.HelloService/SayHello', data);
  check(response, {
    'status is OK': r => r && r.status === grpc.StatusOK
  });
  console.log(JSON.stringify(response.message));
  client.close();
  sleep(1);
};
