import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Picker } from '@react-native-picker/picker';

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Login" screenOptions={tabBarOptions}>
        <Tab.Screen name="Login" component={TelaLogin} />
        <Tab.Screen name="Cadastro" component={TelaCadastro} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
function TelaLogin() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = () => {
    if (!cpf || !senha) return alert('Preencha todos os campos!');
    alert('Bem-vindo ao Bank Space!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bank Space</Text>

      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#aaa"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#aaa"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={fazerLogin}>
        <Text style={styles.textoBotao}>Conectar</Text>
      </TouchableOpacity>
    </View>
  );
}
function TelaCadastro() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [renda, setRenda] = useState('');
  const [tipoConta, setTipoConta] = useState('');
  const [lista, setLista] = useState([]);

  const cadastrar = async () => {
    if (!nome || !cpf || !renda || !tipoConta) {
      return alert('Preencha todos os campos!');
    }

    const dados = { nome, cpf, renda, tipoConta };

    try {
      const resposta = await fetch(`${BASE_URL}/inserir.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(dados)
      });
      const texto = await resposta.text();
      let retorno = null;
      try {
        retorno = JSON.parse(texto);
      } catch {
        return alert("Resposta inválida do servidor: " + texto);
      }

      if (retorno.sucesso) {
        alert("Cadastro enviado para o banco!");
        setLista(prev => [...prev, dados]);
        setNome("");
        setCpf("");
        setRenda("");
        setTipoConta("");
      } else {
        const msg = retorno.mensagem || "Erro ao cadastrar no PHP!";
        alert(msg);
      }

    } catch (erro) {
      alert("Falha na conexão com o servidor PHP: " + erro.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor="#aaa"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={cpf}
        onChangeText={setCpf}
      />

      <TextInput
        style={styles.input}
        placeholder="Renda mensal (R$)"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={renda}
        onChangeText={setRenda}
      />
      <Picker
        selectedValue={tipoConta}
        onValueChange={(valor) => setTipoConta(valor)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o tipo de conta" value="" />
        <Picker.Item label="Conta Corrente" value="corrente" />
        <Picker.Item label="Conta Poupança" value="poupanca" />
        <Picker.Item label="Conta Salário" value="salario" />
      </Picker>

      <TouchableOpacity style={styles.botao} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.subtitulo}>Usuários cadastrados:</Text>

      <FlatList
        data={lista}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemLista}>
            <Text style={styles.textoLista}>Nome: {item.nome}</Text>
            <Text style={styles.textoLista}>CPF: {item.cpf}</Text>
            <Text style={styles.textoLista}>Renda: R$ {item.renda}</Text>
            <Text style={styles.textoLista}>Conta: {item.tipoConta}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#a020f0',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    width: '100%',
    borderColor: '#a020f0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    color: '#fff',
  },
  picker: {
    width: '100%',
    backgroundColor: '#111',
    borderColor: '#a020f0',
    borderWidth: 1,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#a020f0',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemLista: {
    borderColor: '#a020f0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  textoLista: {
    color: '#fff',
  },
});

const tabBarOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#000',
    height: 70,
  },
  tabBarActiveTintColor: '#a020f0',
  tabBarInactiveTintColor: '#888',
  tabBarLabelStyle: {
    fontSize: 13,
    fontWeight: 'bold',
  },
};
