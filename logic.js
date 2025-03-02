class Logic{
    arrayObjects = {};

    arraySettings = {
        'premisesQuantity': 5,
        'typeOfGame': ['default']
    };

    getSubjects(subjectTypeName){
        let arResult = [];

        if(data[subjectTypeName] ?? ''){
            let subjectArraySize = data[subjectTypeName].length - 1;

            for(let iteration = 0; iteration < subjectArraySize; iteration++){
                arResult.push(data[subjectTypeName][random_int(0, subjectArraySize)]);
            }
        }

        return arResult;
    }

    arrayDiff(arraySave, arrayExcept){
        return arrayExcept.filter(value => !arraySave.includes(value));
    }
    arrayIntersect(arrayOne, arrayTwo){
            return arrayOne.filter(value => arrayTwo.includes(value));
    }

    generateString(size){
        let result = '';
        let arrayAlphabet = this.getSubjects('arrayAlphabet');

        for (let iteration = 0; iteration < size; iteration++){
            result = result + (random_element(arrayAlphabet).toUpperCase());
        }
        return result;
    }

    getName(){
        let result = '';
        let arrayNames = data['arrayNames'];
        result = (random_element(arrayNames).toUpperCase());
        return result;
    }

    fillArrayForSize(array, size){
        while(array.length < size){
            array.push(this.generateString(3));
        }
        return array;
    }

    shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }


    generateGame(){
        let arrayResult = {
            "premises"   : [],
            "conclusion" : ''
        };

        let arraySubjects = this.getSubjects('arrayAlphabet');
        let stringRandomSubject = '';
        let stringLastSubject = '';
        let stringFirstSubject = '';

        let arrayAdditionalSubjects = this.getSubjects('arrayAlphabet').splice(this.arraySettings['premisesQuantity']);
        let arrayRelations = Object.keys(data['arrayConditions']['default']);
        let arrayLinks = Object.keys(data['arrayConditions']['link']);
        let stringRelation = '';
        let stringLink = '';

        for (let iteration = 0; iteration <= this.arraySettings['premisesQuantity']; iteration++){
            stringRandomSubject = this.getName();

            while (this.arrayObjects[stringRandomSubject] ?? 0){
                stringRandomSubject = this.getName();
            }

            if(iteration == 0){
                stringFirstSubject = stringRandomSubject;
            }

            this.arrayObjects[stringRandomSubject] = this.fillArrayForSize(this.arrayObjects[stringLastSubject] ?? [], this.arraySettings['premisesQuantity']);

            if(stringRelation.length && stringLink.length){
                if(stringRelation == "all"){
                    if(stringLink == "is"){
                        this.arrayObjects[stringRandomSubject] = this.arrayObjects[stringLastSubject].slice();
                        this.arrayObjects[stringRandomSubject].push(this.generateString(3));
                    }
                    if(stringLink == "is_not"){
                        this.arrayObjects[stringRandomSubject] = this.arrayDiff(this.arrayObjects[stringLastSubject], this.arrayObjects[stringRandomSubject]);
                    }
                }
                if(stringRelation == "some"){
                    if(stringLink == "is"){
                        this.arrayObjects[stringRandomSubject] = random_elements(this.arrayObjects[stringLastSubject], random_int(1, this.arrayObjects[stringLastSubject].length));
                    }
                    if(stringLink == "is_not"){
                       if(this.arrayObjects[stringLastSubject].length <= 1){
                           this.arrayObjects[stringRandomSubject] = random_elements(arrayAdditionalSubjects, this.arraySettings['premisesQuantity']).filter(unique);
                       }else{
                           this.arrayObjects[stringRandomSubject] = this.arrayObjects[stringLastSubject].splice(this.arrayObjects[stringLastSubject].length - 1);
                       }
                    }
                }
                this.arrayObjects[stringRandomSubject] = this.fillArrayForSize(this.arrayObjects[stringRandomSubject], this.arraySettings['premisesQuantity']);
                
                
                let stringPremise = stringRelation + " - " + stringLastSubject + " - " +stringLink + " - " + stringRandomSubject;
                arrayResult['premises'].push(stringPremise)
                console.log(stringPremise);
            }

            stringLastSubject = stringRandomSubject;
            stringRelation    = random_element(arrayRelations);
            stringLink        = random_element(arrayLinks);
        }
        arrayResult['premises']   = this.shuffle(arrayResult['premises']);
        arrayResult['conclusion'] = stringRelation + " " + stringFirstSubject + " " +stringLink + " " + stringLastSubject;

        console.log(arrayResult);

        return arrayResult;
    }
}

/*



QAG = {
    "all_is_not" =
}

 
 */