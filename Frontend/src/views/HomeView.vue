<template>
  <div v-if="showModal"  @click="showModal = false" class="absolute w-screen h-screen bg-gray-500 bg-opacity-50 backdrop-filter backdrop-blur-lg z-50 flex items-center justify-center">
    <div  class="calculatrice w-full md:flex md:justify-center md:items-center">
      <div @click.stop class="w-5/6 sm:w-96 mx-auto sm:mx-2 p-6 bg-white border border-gray-200 rounded-lg shadow">
        <h2>Calculateur d'emprunt</h2>

        <form class="mt-6">

          <label for="calculationMethod">Méthode de calcul :</label>
          <select id="calculationMethod" v-model="typeEmprunt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
            <option value="annuite">Annuité</option>
            <option value="amortissement">Amortissement</option>
          </select>

          <div class="inputs mb-6 mt-6">
            <div>
              <label for="montant">Montant :</label>
              <input type="number" id="montant" v-model="montantEmprunt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Montant de l'emprunt">
            </div>
            <div class="mt-2">
              <label for="taux">Taux d'emprunt :</label>
              <input type="number" id="taux" v-model="tauxEmprunt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Taux d'emprunt">
            </div>
            <div class="mt-2">
              <label for="duree" >Durée :</label>
              <input type="number" id="duree" v-model="dureeEmprunt" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Durée de l'emprunt en années">
            </div>
          </div>

          <a type="button" @click="calculerEmpruntTableau" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Calculer</a>
        </form>
      </div>
      <div @click.stop v-if="existenceTableau" class=" max-w-md mx-auto sm:mx-2 sm:max-w-full p-6 w-5/6 sm:w-auto bg-white border border-gray-200 rounded-lg shadow  overflow-hidden overflow-scroll">
        <table class="w-full text-sm text-left text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50  ">
          <tr>
            <th scope="col" class="px-6 py-3">
              Année(s)
            </th>
            <th scope="col" class="px-6 py-3">
              Restant dû
            </th>
            <th scope="col" class="px-6 py-3">
              Intérêt
            </th>
            <th scope="col" class="px-6 py-3">
              Amortissement
            </th>
            <th scope="col" class="px-6 py-3">
              Annuité
            </th>
            <th scope="col" class="px-6 py-3">
              Valeur nette
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="row in tableauEmprunt" :key="row.annee" class="bg-white border-b ">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
              {{ row.annee }}
            </th>
            <td class="px-6 py-4">
              {{ row.restantDu }}
            </td>
            <td class="px-6 py-4">
              {{ row.interet }}
            </td>
            <td class="px-6 py-4">
              {{ row.amortissement }}
            </td>
            <td class="px-6 py-4">
              {{ row.annuite }}
            </td>
            <td class="px-6 py-4">
              {{ row.valeurNette }}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <section class="bg-gradient-to-r from-white to-gray-300 h-full">
    <div
        class="mx-auto max-w-screen-xl  px-20 lg:px-4 py-32 lg:flex lg:h-screen lg:items-center"
    >
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl font-extrabold sm:text-5xl">
          Trouvez un prêt
          <strong class="font-extrabold text-blue-700 text-lg sm:text-3xl block">
            Contactez un courtier
          </strong>
        </h1>

        <p class="mt-4 sm:text-xl/relaxed">
          La clé de votre projet immobilier : notre réseau, votre réussite !
        </p>

        <div @click="showModal = true" class="mt-8 flex flex-wrap justify-center cursor-pointer gap-4">
          <div
              style="width: 200px; height: 50px;"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 "
          >
            Simuler un prêt
          </div>
        </div>
      </div>
    </div>
  </section>

</template>
<script>





  export default {
    data() {
      return {
        existenceTableau: false,
        montantEmprunt: '',
        tauxEmprunt: '',
        dureeEmprunt: '',
        typeEmprunt: '',
        tableauEmprunt: [],
        coutEmprunt: '',
        anneesEmprunt: '',
        showModal: false,
        con: false
      };
    },
    
    methods: {
      resetEmpruntTableau() {
        this.montantEmprunt = '';
        this.tauxEmprunt = '';
        this.dureeEmprunt = '';
        this.typeEmprunt = '';
        this.existenceTableau = false;
      },
      calculerEmpruntTableau() {
        const montantEmprunt = parseFloat(this.montantEmprunt);
        const tauxEmprunt = parseFloat(this.tauxEmprunt) / 100;
        const dureeEmprunt = parseInt(this.dureeEmprunt);
        const typeEmprunt = this.typeEmprunt;

        if (montantEmprunt === '' || tauxEmprunt === '' || dureeEmprunt === '') {
          alert("Il manque une ou plusieurs valeurs. Veuillez vérifier le montant, le taux et la durée svp.");
        } else {
          if (isNaN(montantEmprunt) || isNaN(tauxEmprunt) || isNaN(dureeEmprunt)) {
            alert("Veuillez insérer des nombres dans les paramètres et non des chaînes de caractères.");
          } else {
            if (this.existenceTableau) {
              this.tableauEmprunt = []
            }

            this.existenceTableau = true;

            const tableau_emprunt = this.calculEmprunt(montantEmprunt, tauxEmprunt, dureeEmprunt, typeEmprunt);
            this.tableauEmprunt.push({
              annee: 1,
              restantDu: tableau_emprunt.montant_emprunt,
              interet: tableau_emprunt.interet_const[0],
              amortissement: tableau_emprunt.amortissement_const[0],
              annuite: tableau_emprunt.annuite_const_an[0],
              valeurNette: tableau_emprunt.valeur_finale_const[0]
            });


            var compteur = 1;
            while (compteur < dureeEmprunt) {
              this.tableauEmprunt.push({
                annee: compteur + 1,
                restantDu: tableau_emprunt.valeur_finale_const[compteur - 1],
                interet: tableau_emprunt.interet_const[compteur],
                amortissement:  tableau_emprunt.amortissement_const[compteur],
                annuite: tableau_emprunt.annuite_const_an[compteur],
                valeurNette: tableau_emprunt.valeur_finale_const[compteur]
              });

              compteur++;


            }

            if (compteur == dureeEmprunt) // correction dernière ligne et dernière annuité
            {
              this.tableauEmprunt[compteur-1].annuite = parseFloat(this.tableauEmprunt[compteur-1].annuite ) + parseFloat(this.tableauEmprunt[compteur-1].valeurNette)
              this.tableauEmprunt[compteur-1].valeurNette = 0;
            }

            let coutEmprunt = 0;
            this.tableauEmprunt.forEach((item) => {
              coutEmprunt += parseFloat(item.interet);
            });

            this.coutEmprunt = this.arrondirA2(coutEmprunt);
            this.anneesEmprunt = dureeEmprunt;
          }
        }
      },
      calculEmprunt(montant_total, taux_emprunt, duree_an, type) {
        // annuité contante
        let annuite_const_an = [];
        let montant_emprunt = montant_total;
        let interet_const = [];
        let amortissement_const = [];
        let valeur_finale_const = [];
        let cout_emprunt = 0;

        var compteur_const = 0;

        if (type == "annuite") {
          while (compteur_const <= duree_an) {

            if (compteur_const === 0) {
              interet_const[compteur_const] = this.arrondirA2(montant_total * taux_emprunt);
            } else {
              interet_const[compteur_const] = this.arrondirA2(valeur_finale_const[compteur_const - 1] * taux_emprunt);
            }

            if (taux_emprunt == 0) // car avec formule annuite constante il y a un problème avec un taux 0
            {
              annuite_const_an[compteur_const] = this.arrondirA2(montant_total / duree_an);
            } else {
              annuite_const_an[compteur_const] = this.arrondirA2(montant_total * taux_emprunt / (1 - Math.pow(1 + taux_emprunt, -duree_an)));
            }

            amortissement_const[compteur_const] = this.arrondirA2(annuite_const_an[compteur_const] - interet_const[compteur_const]);

            if (compteur_const === 0) {
              valeur_finale_const[compteur_const] = this.arrondirA2(montant_total - amortissement_const[compteur_const]);
            } else {
              valeur_finale_const[compteur_const] = this.arrondirA2(valeur_finale_const[compteur_const - 1] - amortissement_const[compteur_const]);
            }

            compteur_const++;

            cout_emprunt = 0;

            var compteur = 0;
            while (compteur < compteur_const) {
              cout_emprunt = cout_emprunt + parseFloat(interet_const[compteur]);
              compteur++
            }
          }
        } else {
          while (compteur_const <= duree_an) {

            if (compteur_const === 0) {
              interet_const[compteur_const] = this.arrondirA2(montant_total * taux_emprunt);
            } else {
              interet_const[compteur_const] = this.arrondirA2(valeur_finale_const[compteur_const - 1] * taux_emprunt);
            }

            amortissement_const[compteur_const] = this.arrondirA2(montant_total / duree_an);

            annuite_const_an[compteur_const] = this.arrondirA2(parseFloat(interet_const[compteur_const]) + parseFloat(amortissement_const[compteur_const]));

            if (compteur_const === 0) {
              valeur_finale_const[compteur_const] = this.arrondirA2(montant_total - amortissement_const[compteur_const]);
            } else {
              valeur_finale_const[compteur_const] = this.arrondirA2(valeur_finale_const[compteur_const - 1] - amortissement_const[compteur_const]);
            }

            compteur_const++;

            cout_emprunt = 0;

            let compteur = 0;
            while (compteur < compteur_const) {
              cout_emprunt = cout_emprunt + parseFloat(interet_const[compteur]);
              compteur++
            }
          }
        }

        return {
          annuite_const_an,
          montant_emprunt,
          interet_const,
          amortissement_const,
          valeur_finale_const,
          montant_total,
          cout_emprunt
        }
      },
      arrondirA2(montant) {
        if (this.verifDecimal(montant)) {
          return montant.toFixed(2);
        } else {
          return montant;
        }
      },
      verifDecimal(montant) {
        return !isNaN(montant) && parseInt(montant) != montant;
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




</style>

